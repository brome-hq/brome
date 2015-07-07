#!/usr/bin/env python

import sys

from brome import Brome

from model.selector import selector_dict
from browser_config.local_config import local_config_dict

if __name__ == '__main__':

    brome = Brome(
        config_path = "/Users/pyrat/Documents/PROG/PYTHON/brome/example/brome.ini",
        selector_dict = selector_dict,
        local_config_dict = local_config_dict
    )

    brome.execute(sys.argv)
