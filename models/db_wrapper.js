var exports = module.exports = {};
const fs = require('fs');
const util = require('../modules/util.js');
const uid = require('uid2');
//const debug = require('../modules/debug.js');
var appConfig;
var pg = require('pg');

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

exports.getUser = function(email){
  console.log("Getting User for email: " + email);
  var values = [email];

  var query = "SELECT * FROM public.\"users\" WHERE email = $1";
  pool.query(query,values)
    .then(res => {
      console.log(res.rows[0])
      if (res.rows[0]){
        console.log(res.rows[0].password);
        return res.rows[0];
      } else {
        console.log("user does not exist")
        return;
      }
    })
    .catch( e => {
      console.error("could not get user " + email + ": " + e)
    });
}

function addNewUser(user){
    console.log("adding user " + user.email);
    var values = [user.name, user.email, user.password, user.role, new Date().toISOString().slice(0,10), uid(8)]
    var query = "INSERT INTO public.\"users\"(name, email, password, role, date_created, uid) VALUES ($1, $2, $3, $4, $5, $6)";
    
    pool.query(query, values, (err, res) => {
        if(err){
            console.log(err);
            return false;
        }
        console.log(user.name + " successfully added to the database");
        console.log(JSON.stringify(user));
        return true; 
    });
}

exports.addUser = (user) => {
    console.log("checking if user exists for email: " + user.email);
    var val = [user.email];
    var qry = "SELECT * FROM public.\"users\"where email = $1";
    pool.query(qry,val, (err,res) => {
        if(err){
            console.log("Error while adding a new user");
            console.log(err);
        }
        if(res.rows[0]){
            console.log("user already exists");
        } else{
            console.log("user not found, creating a new entry in db");
            if (addNewUser(user)){
                console.log("user added for " + user.name + ", " + user.email);
            } else {
                console.log("ERROR adding user " + user.name + ", " + user.email);
            }
            console.log(JSON.stringify(res.rows[0]))
        }
    });
}



//Data queries

exports.getMatch = function(matchNumber, station, response){
  console.log("Getting Match: " + matchNumber + " for station: " + station);
  var values = [parseInt(matchNumber)];

  var query = "SELECT * FROM public.\"matchSchedule\" WHERE match_number = $1";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }

    response.render('scouting',{
      'teamNumber': res.rows[0][station],
      'matchNumber' : res.rows[0]['match_number'],
      'station': station
      });

    });
}
