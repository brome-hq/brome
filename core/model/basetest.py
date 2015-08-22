#! -*- coding: utf-8 -*-

import logging
import os.path
import os
import pickle

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from brome.core.model.utils import *
from brome.core.model.stateful import Stateful
from brome.core.model.proxy_driver import ProxyDriver
from brome.core.model.meta.base import Session
from brome.core.model.test_instance import TestInstance
from brome.core.model.test_result import TestResult
from brome.core.model.test import Test
from brome.core.model.configurator import get_config_value, parse_brome_config_from_browser_config, default_config, test_config_to_dict

class BaseTest(object):

    def __init__(self, **kwargs):
        self._crash_error = False

        self._runner = kwargs.get('runner')
        self._name = kwargs.get('name')
        self._index = kwargs.get('index')
        self._browser_config = kwargs.get('browser_config')
        self._test_batch_id = kwargs.get('test_batch_id')

        self._sa_test_batch = self._runner.sa_test_batch

        self._session = Session()

        self._sa_test_instance = TestInstance(
            starting_timestamp = datetime.now(),
            name = self._name,
            testbatch = self._sa_test_batch
        )

        self._session.add(self._sa_test_instance)
        self._session.commit()

        #TEST BATCH DIRECTORY
        self._runner_dir = self._runner.runner_dir

        #LOGGING
        self.configure_logger()

        #DRIVER
        self.init_driver()

        self.configure_test_result_dir()

        #TEST KWARGS
        self._test_config = test_config_to_dict(self.get_config_value("runner:test_config"))

    def init_driver(self, retry = 10):

        #LOCAL
        if self._browser_config.location == 'localhost':
            try:
                driver = getattr(webdriver, self._browser_config.get('browserName'))()
            except AttributeError:
                raise Exception("The browserName('%s') is invalid"%self._browser_config.get('browserName'))

        #REMOTE
        elif self._browser_config.location in ['virtualbox', 'ec2']:
            config = self._browser_config.config

            desired_cap = {}
            desired_cap['browserName'] = config.get('browserName')
            desired_cap['platform'] = config.get('platform')
            desired_cap['javascriptEnabled'] = True

            if desired_cap['browserName'].lower() == "chrome":
                chrome_options = Options()
                chrome_options.add_argument("--test-type")
                chrome_options.add_argument("--disable-application-cache")
                desired_cap=chrome_options.to_capabilities()

            try:
                command_executor = "http://%s:%s/wd/hub"%(
                    self.get_config_value("grid_runner:selenium_server_ip"),
                    self.get_config_value("grid_runner:selenium_server_port")
                )

                driver = webdriver.Remote(
                        command_executor = command_executor,
                        desired_capabilities = desired_cap
                )

                self.info_log('Got a session')

            except Exception as e:
                if unicode(e).find("Error forwarding the new session") != -1:
                    if retry:

                        self.info_log("Waiting 5 sec because the pool doesn't contain the needed browser.")

                        sleep(5)

                        return self.init_driver(retry = (retry - 1))
                    else:
                        raise Exception("Cannot get the driver")

        self.pdriver = ProxyDriver(
            driver = driver,
            test_instance = self,
            runner = self._runner
        )

    def delete_state(self):
        state_pickle = self.get_state_pickle_path()

        if os.path.isfile(state_pickle):
            os.remove(state_pickle)
            self.info_log("State deleted: %s"%state_pickle)

    def get_state_pickle_path(self):
        #Extract the server name
        server = self.pdriver.get_config_value("project:server")

        state_dir = os.path.join(
            self.get_config_value("project:absolute_path"),
            "tests",
            "states"
        )
        create_dir_if_doesnt_exist(state_dir)

        state_pickle = os.path.join(
            state_dir,
            string_to_filename('%s_%s_%s.pkl'%(self._name.replace(' ', '_'), server, self._index))
        )

        return  state_pickle

    def save_state(self):
        self.info_log("Saving state...")

        state = {}
        state = {key:value for (key, value) in self.__dict__.iteritems() if key[0] != '_'}
        del state['pdriver']

        effective_state = Stateful.cleanup_state(state)

        state_pickle = self.get_state_pickle_path()
        
        with open(state_pickle,'wb') as s:
            pickle.dump(effective_state, s)

        self.info_log("State saved: %s"%state_pickle)

    def load_state(self):
        self.info_log("Loading state...")

        def set_pdriver(value):
            if Stateful in value.__class__.__bases__:
                value.pdriver = self.pdriver
            elif type(value) is list:
                for v in value:
                    set_pdriver(v)
            elif type(value) is dict:
                for k, v in value.iteritems():
                    set_pdriver(v)

        #Extract the server name
        state_pickle = self.get_state_pickle_path()

        if os.path.isfile(state_pickle):
            with open(state_pickle, 'rb') as s:
                state = pickle.load(s)
        else:
            self.info_log("No state found.")

            return False

        for key, value in state.iteritems():
            set_pdriver(value)

        self.__dict__.update(state)

        self.info_log("State loaded")

        return True

    def configure_logger(self):
        logger_name = self._name

        self.test_log_dir = os.path.join(
            self._runner_dir,
            "logs"
        )
        self._logger = logging.getLogger(logger_name)

        create_dir_if_doesnt_exist(self.test_log_dir)

        format_ = self.get_config_value("logger_test:format")

        #Stream logger 
        if self.get_config_value('logger_test:streamlogger'):
            sh = logging.StreamHandler()
            stream_formatter = logging.Formatter(format_)
            sh.setFormatter(stream_formatter)
            self._logger.addHandler(sh)

        #File logger
        if self.get_config_value('logger_test:filelogger'):
            test_name = string_to_filename(self._name)
            fh = logging.FileHandler(os.path.join(
                self.test_log_dir,
                "%s_%s.log"%(test_name, self._browser_config.get_id())
            ))
            file_formatter = logging.Formatter(format_)
            fh.setFormatter(file_formatter)
            self._logger.addHandler(fh)

        self._logger.setLevel(getattr(logging, self.get_config_value('logger_test:level')))

    def get_logger_dict(self):
        return {'batchid': self._test_batch_id, 'testname': "%s"%self._name}

    def debug_log(self, msg):
        self._logger.debug("[debug]%s"%msg, extra=self.get_logger_dict())

    def info_log(self, msg):
        self._logger.info("%s"%msg, extra=self.get_logger_dict())

    def warning_log(self, msg):
        self._logger.warning("[warning]%s"%msg, extra=self.get_logger_dict())

    def error_log(self, msg):
        self._logger.error("[error]%s"%msg, extra=self.get_logger_dict())

    def critical_log(self, msg):
        self._logger.critical("[critical]%s"%msg, extra=self.get_logger_dict())

    def execute(self):
        try:
            self.before_run()

            if self._test_config.get("delete_state"):
                self.delete_state()

            if not self.load_state():
                if hasattr(self, 'create_state'):
                    self.create_state()
                    self.save_state()

            self.run(**self._test_config)

            self.after_run()

        except Exception, e:
            self.error_log('Test failed')

            tb = traceback.format_exc()

            self.error_log('Crash: %s'%tb)

            self.fail(tb)
        finally:
            self.end()

    def end(self):
        self.info_log("Test ended")

        self.quit_driver()

        if self.get_config_value("runner:play_sound_on_test_finished"):
            say(self.get_config_value("runner:sound_on_test_finished"))

        self._sa_test_instance.ending_timestamp = datetime.now()
        self._session.commit()

    def quit_driver(self):
        self.info_log("Quitting the browser...")
        try:
            self.pdriver.quit()
        except Exception as e:
            self.error_log('Exception driver.quit(): %s'%str(e))

    def before_run(self):
        pass

    def after_run(self):
        pass

    def fail(self, tb):
        if self.get_config_value("runner:play_sound_on_test_crash"):
            say(self.get_config_value("runner:sound_on_test_crash"))

        if self.get_config_value("runner:embed_on_test_crash"):
            self.pdriver.embed()

        self._crash_error = '[!]%s %s crashed: %s'%(self._name, self._browser_config.get_id(), str(tb))

        self.create_crash_report(tb)

    def create_crash_report(self, tb):
        self.info_log('Creating a crash report')

        file_name = "%s - %s"%(self.pdriver.get_id(join_char = '_'), self._name)

        #CRASH LOG
        with open(os.path.join(self._crash_report_dir, string_to_filename('%s.log'%file_name)), 'w') as f:
            f.write(str(tb))

        #CRASH SCREENSHOT
        self.pdriver.take_screenshot(screenshot_path = os.path.join(
            self._crash_report_dir,
            string_to_filename('%s.png'%file_name)
        ))

    def get_config_value(self, config_name):
        if not hasattr(self, 'browser_brome_config'):
            self._browser_brome_config = parse_brome_config_from_browser_config(self._browser_config.config)

        config_list = [
            self._browser_brome_config,
            self._runner.config,
            self._runner.brome_config,
            default_config
        ]
        value = get_config_value(config_list, config_name)

        if hasattr(self, '_logger'):
            self.debug_log("config_value (%s): %s"%(config_name, value))

        return value

    def configure_test_result_dir(self):

        #CRASH DIRECTORY
        self._crash_report_dir = os.path.join(
            self._runner_dir,
            'crashes'
        )

        create_dir_if_doesnt_exist(self._crash_report_dir)

        #ASSERTION SCREENSHOT DIRECTORY
        self._assertion_screenshot_relative_dir = os.path.join(
            self._runner.relative_runner_dir,
            'assertion_screenshots',
            self.pdriver.get_id(join_char = '_')
        )

        self._assertion_screenshot_dir = os.path.join(
            self._runner_dir,
            'assertion_screenshots',
            self.pdriver.get_id(join_char = '_')
        )
        create_dir_if_doesnt_exist(self._assertion_screenshot_dir)

        #SCREENSHOT DIRECTORY
        self._screenshot_dir = os.path.join(
            self._runner_dir,
            'screenshots',
            self.pdriver.get_id(join_char = '_')
        )
        create_dir_if_doesnt_exist(self._screenshot_dir)

    def get_test_result_summary(self):
        results = []

        base_query = self._session.query(TestResult).filter(TestResult.test_instance_id == self._sa_test_instance.id).filter(TestResult.browser_id == self.pdriver.get_id())
        total_test = base_query.count()
        total_test_successful = base_query.filter(TestResult.result == True).count()
        total_test_failed = base_query.filter(TestResult.result == False).count()
        failed_tests = base_query.filter(TestResult.result == False).all()

        results.append('Total_test: %s; Total_test_successful: %s; Total_test_failed: %s'%(total_test, total_test_successful, total_test_failed))

        for failed_test in failed_tests:
            test = self._session.query(Test).filter(Test.id == failed_test.test_id).one()
            if self._runner.brome.test_dict.has_key(test.test_id):
                test_config = self._runner.brome.test_dict[test.test_id]
                if type(test_config) == dict:
                    test_name = test_config.get('name')
                else:
                    test_name = test_config
            else:
                test_name = test.test_id

            results.append('[%s]%s'%(test.test_id, test_name))

        return results
