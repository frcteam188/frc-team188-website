var exports = module.exports = {};
const fs = require('fs');
const util = require('../modules/util.js');
const debug = require('../modules/debug.js');
var appConfig;

/*
 * ===== Module body =====
 */
console.info('Looking for config file.');
// look to see if custom configuration is provided
if (fs.existsSync('./configs/configs.json')) {
  console.info('Found config file. Reading config.');

  appConfig = util.readToObj('./configs/configs.json', 'utf8');

  console.info('Finished getting config data.');
  console.log(`Config data - ${JSON.stringify(appConfig)}`);
} else {
  const msg = 'No config found! Application may fail to work.';
  console.warn(msg);
  console.warn(msg);
  // copy default config
}

var pg = require('pg');
var config = {
  host: appConfig.stagingDb.host,
  port: appConfig.stagingDb.port,
  user: appConfig.stagingDb.user,
  password: appConfig.stagingDb.password,
  database: appConfig.stagingDb.database,
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

// exports.getUser = function(email){
//   console.log("Getting User for email: " + email);
//   var values = 'parth@me';

//   var query = "SELECT * FROM public.\"users\" WHERE email = $1";
//   pool.query(query, values, function (err, res) {
//     if (err){
//       console.log(err);
//       res.send(err);
//       return;
//     }

//     console.log(res.rows[0]);
//   });
// }
