#! -*- coding: utf-8 -*-

from brome.core.model.utils import *

from model.basetest import BaseTest

class Test(BaseTest):

    name = 'Click'

    def run(self, **kwargs):

        self.info_log("Running...")

        self.app.go_to("click_test")

        element = self.pdriver.find("id:1")

        element.click()

        result = self.pdriver.find("xp://*[contains(text(), 'clicked')]")

        assert result != None
