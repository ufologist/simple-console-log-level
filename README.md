# simple-console-log-level

[![NPM version][npm-image]][npm-url] [![Build status][build-image]][build-url] [![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/simple-console-log-level.svg?style=flat-square
[npm-url]: https://npmjs.org/package/simple-console-log-level

[build-image]: https://travis-ci.org/ufologist/simple-console-log-level.svg?branch=master
[build-url]: https://travis-ci.org/ufologist/simple-console-log-level

[license-image]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/ufologist/simple-console-log-level/blob/master/LICENSE

[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/simple-console-log-level/blob/master/CHANGELOG.md

**A dead simple logger with log level support, no dependencies and support all environments:**
- Web
- Node
- [Weapp(微信小程序)](https://mp.weixin.qq.com/cgi-bin/wx) - 做这个主要是因为需要在微信小程序里面用, 找了一圈发现没有合适的库(必须没有任何依赖)
- ...

Will log to STDOUT or STDERR depending on the
chosen log level. It uses `console.trace`, `console.log`, `console.info`, `console.warn` and
`console.error` and hence supports the same API.

Log levels supported: trace, log, info, warn and error.

## Installation

```
npm install simple-console-log-level --save
```

## Example usage

```javascript
var Logger = require('simple-console-log-level');

var logger = new Logger({
    level: Logger.LEVEL_LOG
});

logger.trace('trace'); // will not do anything
logger.log('log');     // will output 'log'
logger.info('info');   // will output 'info'
logger.warn('warn');   // will output 'warn'
logger.error('error'); // will output 'error'
```

## Options

Configure the logger by passing an options object:

```javascript
var Logger = require('simple-console-log-level');

var logger = new Logger({
    level: Logger.LEVEL_LOG,
    prefix: function() {
        return new Date().toISOString() + ' [' + this.options.level + ']';
    }
});
```

### level

A `string` to specify the log level. Defaults to `Logger.LEVEL_LOG`.

All support levels(more below is more higher level).
- `Logger.LEVEL_TRACE` -- Weapp debug mode(调试模式) could not output(in vConsole) this level's logs
- `Logger.LEVEL_LOG`
- `Logger.LEVEL_INFO`
- `Logger.LEVEL_WARN`
- `Logger.LEVEL_ERROR`

More higher than you setting level will output, more lower will not.
Example: `level: Logger.LEVEL_INFO`, log levels below `Logger.LEVEL_INFO`(include itself) will output, log levels above `Logger.LEVEL_INFO` will not output.

### prefix

Specify this option if you want to set a prefix for all log messages.
This must be a `string` or a `function` that returns a string.

Will get the level of the currently logged message as the first
argument.

## Thanks

* [watson/console-log-level](https://github.com/watson/console-log-level)