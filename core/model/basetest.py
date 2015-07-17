#! -*- coding: utf-8 -*-

import logging
import os.path
import pickle

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from brome.core.model.utils import *
from brome.core.model.stateful import Stateful
from brome.core.model.proxy_driver import ProxyDriver
from brome.core.model.meta.base import Session
from brome.core.model.test_instance import TestInstance
from brome.core.model.configurator import get_config_value, parse_brome_config_from_browser_config, default_config, test_config_to_dict

class BaseTest(object):

    def __init__(self, **kwargs):
        self._runner = kwargs.get('runner')
        self._name = kwargs.get('name')
        self._index = kwargs.get('index')
        self._browser_config = kwargs.get('browser_config')

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

        #DRIVER
        self.init_driver()

        self.configure_test_result_dir()

        #TEST KWARGS
        self._test_config = test_config_to_dict(self.get_config_value("runner:test_config"))

        #LOGGING
        self.configure_logger()

    def init_driver(self, retry = 10):

        #LOCAL
        if self._browser_config.runner_type == 'local':
            driver = getattr(webdriver, self._browser_config.get('browserName').capitalize())()

        #REMOTE
        elif self._browser_config.runner_type in ['virtualbox', 'ec2']:
            driver = webdriver.PhantomJS()
            """
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
            """

        self.pdriver = ProxyDriver(
            driver = driver,
            test_instance = self,
            runner = self._runner
        )

    def save_state(self):
        self.info_log("Saving state...")

        state = {}
        state = {key:value for (key, value) in self.__dict__.iteritems() if key[0] != '_'}
        del state['pdriver']

        effective_state = Stateful.cleanup_state(state)

        #Extract the server name
        server = urlparse(self.pdriver.current_url).netloc

        #State pickle name
        state_dir = os.path.join(
            self.get_config_value("project:absolute_path"),
            "tests/states/"
        )
        create_dir_if_doesnt_exist(state_dir)

        state_pickle = os.path.join(
            state_dir,
            string_to_filename('%s_%s_%s.pkl'%(self._name.replace(' ', '_'), server, self._index))
        )

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
        server = urlparse(self.pdriver.current_url).netloc

        state_dir = os.path.join(
            self.get_config_value("project:absolute_path"),
            "tests/states/"
        )

        state_pickle = os.path.join(
            state_dir,
            string_to_filename('%s_%s_%s.pkl'%(self._name.replace(' ', '_'), server, self._index))
        )

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
        logger_name = 'test'

        self.test_log_dir = os.path.join(
            self._runner_dir,
            "logs/"
        )
        self._logger = logging.getLogger(logger_name)

        create_dir_if_doesnt_exist(self.test_log_dir)

        format_ = "[%(batchid)s](%(testname)s):%(message)s"

        #Stream logger 
        if self.get_config_value('logger_test:streamlogger'):
            sh = logging.StreamHandler()
            stream_formatter = logging.Formatter(format_)
            sh.setFormatter(stream_formatter)
            self._logger.addHandler(sh)

        #File logger
        if self.get_config_value('logger_test:filelogger'):
            test_name = string_to_filename(self._name)
            fh = logging.FileHandler('%s%s_%s.log'%(self.test_log_dir, test_name, self.pdriver.get_id()))
            file_formatter = logging.Formatter(format_)
            fh.setFormatter(file_formatter)
            self._logger.addHandler(fh)

        self._logger.setLevel(getattr(logging, self.get_config_value('logger_test:level')))

    def get_logger_dict(self):
        return {'batchid': self._runner.sa_test_batch.id, 'testname': "%s"%self._name}

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

            self.run(**self._test_config)

            self.after_run()

        except Exception, e:
            self.error_log('Test failed')

            tb = traceback.format_exc()

            self.error_log('Crash: %s'%tb)

            self.fail()

            raise
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

    def fail(self):
        if self.get_config_value("runner:play_sound_on_test_crash"):
            say(self.get_config_value("runner:sound_on_test_crash"))

        if self.get_config_value("runner:embed_on_test_crash"):
            self._pdriver.embed()

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
        #ASSERTION SCREENSHOT DIRECTORY
        self._assertion_screenshot_dir = os.path.join(
            self._runner_dir,
            self.pdriver.get_id(join_char = '_'),
            'assertion_screenshots/'
        )
        create_dir_if_doesnt_exist(self._assertion_screenshot_dir)

        #SCREENSHOT DIRECTORY
        self._screenshot_dir = os.path.join(
            self._runner_dir,
            self.pdriver.get_id(join_char = '_'),
            'screenshots/'
        )
        create_dir_if_doesnt_exist(self._screenshot_dir)
