
import ConfigParser

default_config = {}
default_config["project"] = {}
default_config["proxy_driver"] = {}
default_config["browser"] = {}
default_config["highlight"] = {}
default_config["runner"] = {}
default_config["database"] = {}
default_config["project"]["absolute_path"] = ""
default_config["proxy_driver"]["default_timeout"] = 5
default_config["proxy_driver"]["raise_exception"] = True
default_config["proxy_driver"]["wait_until_visible_before_find"] = True
default_config["browser"]["window_x_position"] = 0
default_config["browser"]["window_y_position"] = 0
default_config["browser"]["window_height"] = 725
default_config["browser"]["window_width"] = 1650
default_config["highlight"]["element_is_clicked"] = "background: yellow; border: 2px solid red;"
default_config["highlight"]["element_on_assertion_failure"] = "background: red; border: 2px solid black;"
default_config["highlight"]["element_on_assertion_success"] = "background: green; border: 2px solid black;"
default_config["highlight"]["element_is_visible"] = "background: purple; border: 2px solid black;"
default_config["highlight"]["use_highlight"] = True
default_config["runner"]["play_sound_on_test_crash"] = True
default_config["runner"]["play_sound_on_assertion_success"] = False
default_config["runner"]["play_sound_on_assertion_failure"] = True
default_config["runner"]["play_sound_on_test_finished"] = True
default_config["runner"]["sound_on_test_crash"] = 'Crash'
default_config["runner"]["sound_on_assertion_success"] = "{testid} succeeded"
default_config["runner"]["sound_on_assertion_failure"] = "{testid} failed"
default_config["runner"]["sound_on_test_finished"] = "Test finished"
default_config["runner"]["cache_screenshot"] = True
default_config["database"]["dbname"] = ""
default_config["database"]["username"] = ""
default_config["database"]["password"] = ""

def get_config_value(dict_list, config_name):
    try:
        section, option = config_name.split(':')
    except ValueError:
        raise Exception("""
            [get_config_value] config_name should contains the section 
            and the options separated by a colon (eg runner:tests_config)
        """)

    for dict_ in dict_list:
        if dict_.has_key(section):
            if dict_[section].has_key(option):
                return dict_[section][option]

def ini_to_dict(ini_path):
    config = {}

    config_parser = ConfigParser.ConfigParser()

    config_parser.read(ini_path)

    for section in config_parser.sections():
        config[section] = {}
        for option in config_parser.options(section):
                value = config_parser.get(section, option)

                effective_value = value
                if value.lower() in ['false', 'true']:
                     effective_value = config_parser.getboolean(section, option)
                #NOTE will only work with positive integer;
                #not a problem for now since we only have positive integer
                elif value.isdigit():
                    effective_value = config_parser.getint(section, option)

                config[section][option] = effective_value

    return config

def runner_args_to_dict(args):
    config = {}

    brome_config_string = args.brome_config
    if brome_config_string:

        for config_str in brome_config_string.split(','):
            section, option = config_str.split(':')
            option, value = option.split('=')

            if not config.has_key(section):
                config[section] = {}

            effective_value = value
            #NOTE will only work with positive integer;
            #not a problem for now since we only have positive integer
            if value.isdigit():
                effective_value = int(value)
            elif value.lower() in ['false', 'true']:
                if value.lower() == 'false':
                    effective_value = False
                else:
                    effective_value = True

            config[section][option] = effective_value

    config['runner'] = {}
    for arg, value in args.__dict__.iteritems():
        config['runner'][arg] = value

    return config

def parse_brome_config_from_browser_config(browser_config):
    config = {}

    brome_keys = [key for key in browser_config.iterkeys() if key.find(':') != -1]

    for brome_key in brome_keys:
        section, option = brome_key.split(':')
        value = browser_config[brome_key]

        if not config.has_key(section):
            config[section] = {}

        config[section][option] = value

    return config
