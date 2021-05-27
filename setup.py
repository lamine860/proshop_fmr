""" Setup tool """

from setuptools import setup

setup(
    name='proshop_fmr',
    packages=['proshop_fmr'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)