var assert = require('assert');
var CLI = require('../libs/super-cli');

var App = new CLI({
  name: 'App',
  path: __dirname+'/commands',
  command: 'testing'
});

describe('Create new CLI', () => {

  describe('Check CLI options are set correctly', () => {
    it('option.name should be = App', () => assert.equal('App', App.name));
    it('option.path should be = '+__dirname+'/commands', () => assert.equal(__dirname+'/commands', App.path));
    //it('option.command should be = testing', () => assert.equal('testing', App.command));
  });

  describe('Check CLI values', () => {
    it('cli.pid should return the process.pid', () => assert.equal(process.pid, App.pid));
    it('cli.name should be = process.title', () => assert.equal(process.title, App.name));
  });
});


describe('Argument processing', () => {
  describe('Check that the getArguments method are filtering correctly', () => {
    process.argv = [
     'node',
     'script',
     '--help',
     'command',
     'arg1',
     '-f',
     '--key=value',
     'arg2'
    ];

    App.command = undefined;
    App.getArguments();

    it('Command should be equal to command', () => assert.equal('command', App.command));
    it('Options should be equal to --help, -f, --key=', () => assert.deepEqual({'--help': true, '-f': true, '--key=': 'value'}, App.options));
    it('Arguments should be equal to arg1, arg2', () => assert.deepEqual(['arg1', 'arg2'], App.arguments));
  });
});


describe('Commands', () => {
  describe('Register commands', () => {
    it('Register with normal callback', () => {
      App.on('command', () => {
        return true;
      });

      assert.equal(true, App.events.on['command'].callback.call());
    });

    it('Register with callback required from string', () => {
      App.on('command', 'test');

      assert.equal(true, App.events.on['command'].callback.call());
    });
  });
});


describe('Options', () => {
  describe('Check for flags', () => {
    it('Should return false when -a or --admin isn\'t set', () => {
      assert.equal(false, App.has(['-a', '--admin']));
    });

    it('Should return true when -f or --flag is set', () => {
      assert.equal(true, App.has(['-f', '--flag']));
    });
  });

  describe('Check for optional values', () => {
    it('Should return the false because the -u= or --user= isn\'t set', () => {
      assert.equal(false, App.has(['-u=', '--user=']));
    });

    it('Should return the value of the -k= or --key=', () => {
      assert.equal('value', App.has(['-k=', '--key=']));
    });
  });
});


describe('Arguments', () => {
  describe('Check command arguments', () =>{
    it('Register command with arguments', () => {
      App.on('command', (arg1, arg2, arg3, arg4) => {
        return arg1 + arg2 + (arg3 || 0) + (arg4 || 0);
      });

      assert.equal(5, App.events.on['command'].callback.apply(App, [2, 3]));
      assert.equal(14, App.events.on['command'].callback.apply(App, [2, 3, 4, 5]));
    });
  });
});


describe('Trigger command', () => {
  it('Should trigger the command and return the callback', () => {
    App.on('command', (arg1, arg2) => {
      return arg1 + arg2;
    });

    assert.equal(8, App.trigger('command', [4, 4]))
  });
});
