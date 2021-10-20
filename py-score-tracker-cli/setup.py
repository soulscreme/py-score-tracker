
from setuptools import setup, find_packages
from score-tracker-cli.core.version import get_version

VERSION = get_version()

f = open('README.md', 'r')
LONG_DESCRIPTION = f.read()
f.close()

setup(
    name='score-tracker-cli',
    version=VERSION,
    description='CLI for displaying high scores on a common monitor.',
    long_description=LONG_DESCRIPTION,
    long_description_content_type='text/markdown',
    author='LJ Katz',
    author_email='soulscreme@gmail.com',
    url='https://github.com/soulscreme/py-score-tracker',
    license='unlicensed',
    packages=find_packages(exclude=['ez_setup', 'tests*']),
    package_data={'score-tracker-cli': ['templates/*']},
    include_package_data=True,
    entry_points="""
        [console_scripts]
        score-tracker-cli = score-tracker-cli.main:main
    """,
)
