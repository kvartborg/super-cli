# Super-CLI

[![npm version](https://img.shields.io/npm/v/super-cli.svg)](https://www.npmjs.com/package/super-cli)
[![Build Status](https://travis-ci.org/kvartborg/super-cli.svg?branch=master)](https://travis-ci.org/kvartborg/super-cli)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Super-CLI is a micro framework for creating command line tools with Node.js.

A Super-CLI script will have a structure like below.
```sh
my-script command [options, ...] [arguments, ...]
```

### Install
```sh
npm install super-cli -—save
```

### Usage
To get started you have to require the super-cli module and register your commands.
Remember to set the environment to node at the top of the script `#!/usr/bin/env node` and make your script executable `chmod a+x my-script`.
```js
#!/usr/bin/env node

const SuperCLI = require('super-cli')

const cli = new SuperCLI()

cli.on('my-command', arg => {
  console.log(arg)
})
```

#### Register commands
Commands are simply registered like below and arguments are automatically
parsed to the callbacks as function arguments.
If your CLI program has a lot of commands, it would be a great idea to move
the command callbacks into seperate files.
```js
cli.on('my-command', (arg1, arg2, ...args) => {
  // do something
})
```

#### Check for options
```js
cli.option('-h', '--help') // will return true if set
cli.option('-l=', '--lastname=') // will return the value of --lastname if set
```

#### Run command
Trigger a command from within the script.
```js
cli.run('my-command')
```

#### Prompt user for input
```js
cli.prompt('My question:').then(answer => console.log(answer))
```

#### Catch all commands
This will run if no registered command was triggered.
```js
cli.on('*', (...args) => {
  console.log(args)
})
```

#### Listen for data on stdin
```js
cli.stdin(data => console.log(data))
```

#### Write data to stdout
```js
// you can use
console.log('message')
// or
cli.stdout('message')
```

#### On exit
```js
cli.on('exit', () => {
  // this event will fire on cli exit or termination
})
```

#### Exit cli
```js
cli.exit() // will close the cli and fire the exit event
```
