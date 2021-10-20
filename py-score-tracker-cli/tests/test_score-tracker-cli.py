
from pytest import raises
from score-tracker-cli.main import ScoreTrackerCLITest

def test_score-tracker-cli():
    # test score-tracker-cli without any subcommands or arguments
    with ScoreTrackerCLITest() as app:
        app.run()
        assert app.exit_code == 0


def test_score-tracker-cli_debug():
    # test that debug mode is functional
    argv = ['--debug']
    with ScoreTrackerCLITest(argv=argv) as app:
        app.run()
        assert app.debug is True


def test_command1():
    # test command1 without arguments
    argv = ['command1']
    with ScoreTrackerCLITest(argv=argv) as app:
        app.run()
        data,output = app.last_rendered
        assert data['foo'] == 'bar'
        assert output.find('Foo => bar')


    # test command1 with arguments
    argv = ['command1', '--foo', 'not-bar']
    with ScoreTrackerCLITest(argv=argv) as app:
        app.run()
        data,output = app.last_rendered
        assert data['foo'] == 'not-bar'
        assert output.find('Foo => not-bar')
