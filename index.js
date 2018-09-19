'use strict'

/**
 * The dead simple Logger with level support
 * 
 * @example
 * import Logger from 'simple-console-log-level';
 * 
 * var logger = new Logger({
 *     level: Logger.LEVEL_LOG,
 *     prefix: 'foo'
 * });
 * // wrapped console API
 * logger.log('hello', 'world');
 * 
 * @param {object} options
 *                 options.level {string} default Logger.LEVEL_LOG
 *                 options.prefix {string|Function} prefix
 */
function Logger(options) {
    this.options = options || {};
    this.options.level = this.options.level || Logger.LEVEL_LOG;
    this.options.prefix = this.options.prefix || '';
};

/**
 * should output log
 * 
 * @param {string} level current log level
 * @param {string} optLevel config log level
 * @return {boolean}
 */
Logger.prototype.shouldLog = function(level) {
    return Logger.LEVELS.indexOf(level) >= Logger.LEVELS.indexOf(this.options.level);
};
Logger.prototype.getPrefix = function() {
    var prefix = this.options.prefix;
    if (prefix) {
        if (typeof prefix === 'function') {
            prefix = prefix.apply(this);
        }
    }
    return prefix;
};

// log level defined by console API
//
// other log level defined by apache logging
// - TRACE: 0
// - DEBUG: 1
// - INFO: 2
// - WARN: 3
// - ERROR: 4
// - FATAL: 5
// http://commons.apache.org/proper/commons-logging/javadocs/api-release/org/apache/commons/logging/Log.html
Logger.LEVEL_TRACE = 'trace';
Logger.LEVEL_LOG = 'log';
Logger.LEVEL_INFO = 'info';
Logger.LEVEL_WARN = 'warn';
Logger.LEVEL_ERROR = 'error';
Logger.LEVELS = [
    Logger.LEVEL_TRACE,
    Logger.LEVEL_LOG,
    Logger.LEVEL_INFO,
    Logger.LEVEL_WARN,
    Logger.LEVEL_ERROR
];

// wrap console API
Logger.LEVELS.forEach(function(level) {
    Logger.prototype[level] = function() {
        if (this.shouldLog(level)) {
            var args = Array.prototype.slice.apply(arguments);

            var prefix = this.getPrefix();
            if (prefix) {
                args.unshift(prefix);
            }

            return console[level].apply(console, args);
        } else {
            return noop();
        }
    };
});

function noop() {};

module.exports = Logger;