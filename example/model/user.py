#! -*- coding: utf-8 -*-

from brome.core.model.stateful import Stateful

class User(Stateful, object):

    def __init__(self, pdriver = None, name = ''):
        self.pdriver = pdriver
        self.name = name
