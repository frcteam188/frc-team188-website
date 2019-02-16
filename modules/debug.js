// refer to https://developer.ibm.com/node/2016/10/12/the-node-js-debug-module-advanced-usage/
/*
 * ===== Module dependencies =====
 */
const debug = require('debug');

/*
 * ===== Constants =====
 */
const lib = {};

/*
 * ===== Module body =====
 */

/**
 * Joins the array values with the separator in between each value.
 * @param {string[]} parts array of names to be combined
 * @return {string} name created from joined `parts`
 */
function createName(parts) {
  const seperator = ':';

  return parts.join(seperator);
}

/**
 * Creates the debuggers for a type with various levels of debugging.
 *
 * Current levels are info, warn, verbose, debug, and error.
 * @param {string} name type of debugger name
 * @param {string} app name of the app
 * @return {{info: debug, warn: debug, verbose: debug, debug: debug, error: debug}} lib of debuggers
 */
function createDebuggers(name, app) {
  let appAlias = app || 'content-hub';

  // try to get app name from config otherwise do nothing
  if (process.env.appConfig) {
    const appConfig = JSON.parse(process.env.appConfig);

    appAlias = appConfig.appName && appConfig.appName.trim() !== '' ? appConfig.appName : appAlias;
  }

  return {
    log: debug(createName([appAlias, name, 'log ------------->'])),
    info: debug(createName([appAlias, name, 'info'])),
    warn: debug(createName([appAlias, name, 'warn'])),
    verbose: debug(createName([appAlias, name, 'verbose'])),
    debug: debug(createName([appAlias, name, 'debug'])),
    error: debug(createName([appAlias, name, 'error'])),
  };
}

/**
 * Used to recreate the debuggers for each type in the debug library.
 *
 * Required for changing the app name from default value to custom value if
 * the module is used before app config is read.
 */
function refreshDebuggers() {
  Object.keys(lib).forEach((item) => {
    lib[item] = createDebuggers(item);
  });
}

/*
 * ----- Library of debugging objects/functions -----
 */
lib.config = createDebuggers('config');
lib.server = createDebuggers('server');
lib.routes = createDebuggers('routes');
lib.modules = createDebuggers('modules');
lib.createDebuggers = createDebuggers;
lib.refreshDebuggers = refreshDebuggers;

/*
 * ===== Module exports =====
 */
module.exports = lib;
