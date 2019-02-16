var exports = module.exports = {};
const fs = require('fs');
const util = require('../modules/util.js');
const appConfig;

/*
 * ===== Module body =====
 */
debug.info('Looking for config file.');
// look to see if custom configuration is provided
if (fs.existsSync(components.config.custom)) {
  debug.info('Found config file. Reading config.');

  appConfig = util.readToObj('./configs/configs.json', 'utf8');

  debug.info('Finished getting config data.');
  debug.verbose(`Config data - ${JSON.stringify(appConfig)}`);
} else {
  const msg = 'No config found! Application may fail to work.';
  console.warn(msg);
  debug.warn(msg);
  // copy default config
}

var pg = require('pg');

var config = {
  host: appConfig.host,
  port: appConfig.port,
  user: appConfig.user,
  password: appConfig.password,
  database: appConfig.database,
};

pg.defaults.ssl = true;
var pool = new pg.Pool(config);
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  else{
    console.log('pool connected');
  }
});
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})