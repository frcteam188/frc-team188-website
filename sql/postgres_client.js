var exports = module.exports = {};

var pg = require('pg');

var config = {
  host: 'ec2-75-101-142-182.compute-1.amazonaws.com',
  port: 5432,
  user: 'qmtmgvowyjofmc',
  password: '4c9449daef728090f72b89f6d1b7f860d2c7ae5d5e0769490d1773537d93264a',
  database: 'd5re8bgor54efi',
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
    console.log('sdasasdasd');
    response.render('scouting',{
      'teamNumber': res.rows[0][station],
      'matchNumber' : res.rows[0]['match_number'],
      'station': station} );});
}
exports.submitAuto = function(auto){
  console.log("Submiting Auto");
  var values = Object.keys(auto).map(key => auto[key])

  var query = "INSERT INTO public.\"autoData\"(form_id, team_number, match_number, starting_pos, mobility, auto_ball_pickup, auto_high, auto_low, auto_gear_pickup, auto_pref_lift) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
    }
  });
};

exports.submitTele = function(tele){
  console.log("Submiting Tele");
  var values = Object.keys(tele).map(key => tele[key])

  var query = "INSERT INTO public.\"teleData\"(form_id, team_number, match_number, pressure, ground_pickup, tele_high, tele_low, gears_acquired, gears_scored, pref_lift, hang, hang_duration, hang_davit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
    }
  });
};

exports.submitForm = function(form){
  console.log("Submiting form");
  var values = Object.keys(form).map(key => form[key])

  var query = "INSERT INTO public.\"formData\"(form_id, team_number, match_number, gear_bot, shot_bot, defend_bot) VALUES ($1, $2, $3, $4, $5, $6);";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
    }
  });
};
