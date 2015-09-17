#!/usr/bin/env python
# -*- coding: utf-8 -*-


try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


with open('README.rst') as readme_file:
    readme = readme_file.read()

requirements = [
    # TODO: put package requirements here
]

setup(
    name='brome',
    version='0.0.5',
    description="Framework For Selenium",
    long_description=readme,
    author="Brome-HQ",
    author_email='brome.hq@gmail.com',
    url='https://github.com/brome-hq/brome',
    packages=[
        'brome',
        'brome.core',
        'brome.core.model',
        'brome.core.model.meta',
        'brome.core.runner',
        'brome.webserver',
    ],
    package_dir={
        'brome':'brome'
    },
    include_package_data=True,
    install_requires=requirements,
    license="ISCL",
    zip_safe=False,
    keywords='brome',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: ISC License (ISCL)',
        'Natural Language :: English',
        "Programming Language :: Python :: 2",
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
    ]
)
