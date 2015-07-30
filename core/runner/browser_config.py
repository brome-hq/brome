#! -*- coding: utf-8 -*-

from brome.core.model.utils import *

class BrowserConfig(object):
    def __init__(self, **kwargs):
        self.runner = kwargs.get('runner')
        self.browser_id = kwargs.get('browser_id')
        self.browsers_config = kwargs.get('browsers_config')

        self.config = self.browsers_config[self.browser_id]

        #LOCATION
        if self.config.has_key("amiid"):
            self.location = 'ec2'
        elif self.config.has_key("vbox_name"):
            self.location = 'virtualbox'
        elif self.config.get('appium', False):
            self.location = 'appium'
        else:
            self.location = 'localhost'

        self.validate_config()

    def validate_config(self):
        #LOCAL
        if self.location == 'localhost':
            if not 'browserName' in self.config.keys():
                raise Exception("Add the 'browserName' in your local_config: e.g.: 'Firefox', 'Chrome', 'Safari'")

        #EC2
        elif self.location == 'ec2':
            self.validate_ec2_browser_config()
        #VIRTUALBOX
        elif self.location == 'virtualbox':
            pass

    def get(self, key, *args):
        return self.config.get(key, *args)

    def validate_ec2_browser_config(self):
        if self.config.get('launch', True):
            required_keys = [
                'browserName',
                'platform',
                'ssh_key_path',
                'username',
                'amiid',
                'region',
                'instance_type',
                'security_group_ids',
                'selenium_command'
            ]
        else:
            required_keys = [
                'browserName',
                'platform'
            ]

        for key in required_keys:
            if not key in self.config.keys():
                raise Exception("Add the '%s' in your ec2_config"%key)

        optional_keys = {
            'terminate': True,
            'launch': True,
            'nb_instance': 1,
            'nb_browser_by_instance': 1,
            'max_number_of_instance': 1,
            'hub_ip': 'localhost'
        }
        for key, default in optional_keys.iteritems():
            if not key in self.config.keys():
                self.runner.warning_log("Missing config '%s'; using default '%s'"%(key, default))
                self.config[key] = default
