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

    response.render('scouting',{
      'teamNumber': res.rows[0][station],
      'matchNumber' : res.rows[0]['match_number'],
      'station': station
      });

    });
}

exports.getPitMatch = function(matchNumber, response){
  console.log("Getting pit data for match: " + matchNumber);
  var values = [parseInt(matchNumber)];

  var query = "SELECT * FROM public.\"matchSchedule\" WHERE match_number = $1";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }
    var stations = ['r1', 'r2', 'r3', 'b1', 'b2', 'b3'];
    var teamNumbers = [];
    //console.log(res.rows[0]);

    for(var station in stations){
      teamNumbers.push(res.rows[0][stations[station]]);
    }
    getTeamData(teamNumbers, response, matchNumber);
  });
};

function getTeamData(teamNumbers, response, matchNumber){
  var summary = {};
  var stations = ['r1', 'r2', 'r3', 'b1', 'b2', 'b3'];
  for(i in teamNumbers){
    team = teamNumbers[i] + '';
    color = i<3?'#ba3248':'#4286f4';
    teamSummary = {
      'color' : color,
      'station' : stations[i],
      'matchesPlayed' : 0,
      'mobility' : 0,
      'autoGear' : 0,
      'autoGearPickup' : 0,
      'autoBallPickup' : 0,
      'autoHigh' : 0,
      'teleGear': 0,
      'teleGearPickup' : 0,
      'teleHigh' : 0,
      'hangSuccess': 0,
      'hangDuration' : 0
    };
    summary[team] = teamSummary;
  }
  //summary['teamNumbers'] = teamNumbers;

  //console.log(summary);
  var doneQueries = [false, false];
  var query = "SELECT * FROM public.\"autoData\" WHERE team_number = $1 OR team_number = $2 OR team_number = $3 OR team_number = $4 OR team_number = $5 OR team_number = $6";
  pool.query(query, teamNumbers, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }
    //console.log(res);
    //response.render('pitstrat',{});
    for(i in res.rows){
      row = res.rows[i];
      //console.log(row);
      team = row['team_number'];
      //console.log('reading data for team: ' + team + ' in match: ' + row['match_number']);
      summary[team]['matchesPlayed']++;
      summary[team]['mobility'] += (row['mobility']*1);
      summary[team]['autoGear'] += row['auto_gear'];
      summary[team]['autoGearPickup'] += row['auto_gear_pickup'];
      summary[team]['autoBallPickup'] += (row['auto_ball_pickup']*1);
      summary[team]['autoHigh'] += row['auto_high'];
    }
    doneQueries[0] = true;
    if(sendWhenDone(doneQueries, summary, response, matchNumber)){
      return
    }
  });
  var query = "SELECT * FROM public.\"teleData\" WHERE team_number = $1 OR team_number = $2 OR team_number = $3 OR team_number = $4 OR team_number = $5 OR team_number = $6";
  pool.query(query, teamNumbers, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }
    //console.log(res);
    for(i in res.rows){
      row = res.rows[i];
      team = row['team_number'];
      summary[team]['teleGear'] += row['gears_scored'];
      summary[team]['teleGearPickup'] += row['gears_acquired'];
      summary[team]['teleHigh'] += row['tele_high'];
      summary[team]['hangSuccess'] += (row['hang']*1);
      summary[team]['hangDuration'] += row['hang_duration'];
    }
    doneQueries[1] = true;
    if(sendWhenDone(doneQueries, summary, response, matchNumber)){
      return
    }
  });



}
function sendWhenDone(doneQueries, summary, response, matchNumber){
  if(doneQueries[0] && doneQueries[1]){
    for(team in summary){
      if(summary[team]['matchesPlayed'] == 0){
        continue;
      }
      for(key in summary[team]){
        if(key != 'hangDuration' && key != 'hangSuccess'
          && key != 'matchesPlayed' && key!='color' && key != 'station'){
          summary[team][key] = (summary[team][key]/summary[team]['matchesPlayed']).toFixed(2);
        }
      }
      if(summary[team]['hangSuccess'] > 0){
        summary[team]['hangDuration'] = (summary[team]['hangDuration']/summary[team]['hangSuccess']).toFixed(2);
        summary[team]['hangSuccess'] = (summary[team]['hangSuccess']/summary[team]['matchesPlayed']).toFixed(2);
      }
    }
    //response.json(summary);
    scores = {
      'blue' : {
        'autoGear' : 0,
        'teleGear' : 0,
        'autoKpa' : 0,
        'teleKpa' : 0,
        'hang' : 0,
        'score' : 0
      },
      'red' : {
        'autoGear' : 0,
        'teleGear' : 0,
        'autoKpa' : 0,
        'teleKpa' : 0,
        'hang' : 0,
        'score' : 0
      }
    }



    for(i in summary){
      team = summary[i]
      var color = team['color'] == '#ba3248'? 'red' : 'blue';

      scores[color]['autoGear'] += parseFloat(team['autoGear']);
      scores[color]['teleGear'] += parseFloat(team['teleGear']);
      scores[color]['autoKpa'] += parseFloat(team['autoHigh']);
      scores[color]['teleKpa'] += parseFloat(team['teleHigh']);
      scores[color]['hang'] += parseFloat(team['hangSuccess']);

      console.log(color + 'a: ' + scores[color]['autoGear']);

    }
    for(color in scores){
      if(scores[color]['autoGear'] >= 1){
        scores[color]['score'] += 20;
        console.log(color + ': ' + scores[color]['score']);
      }
      if(scores[color]['autoGear'] >= 3){
          scores[color]['score'] += 20;
        //  console.log(color + ': ' + scores[color]['score']);
      }

      gears = scores[color]['autoGear'] + scores[color]['teleGear'];

      if(gears >= 1){
        scores[color]['score'] += 40;
        //console.log(color + ': ' + scores[color]['score']);
      }
      if(gears >= 3){
          scores[color]['score'] += 40;
          //console.log(color + ': ' + scores[color]['score']);
      }
      if(gears >= 6){
          scores[color]['score'] += 40;
          //console.log(color + ': ' + scores[color]['score']);
      }
      if(gears >= 12){
          scores[color]['score'] += 40;
        //  console.log(color + ': ' + scores[color]['score']);
      }
      scores[color]['score'] += scores[color]['autoKpa'] + scores[color]['teleKpa'];
      scores[color]['score'] += scores[color]['hang']*50.0;
      //console.log(color + ': ' + scores[color]['score']);
    }


    response.render('pitstrat', {'summary' : summary, 'matchNumber' : parseInt(matchNumber), 'red' : scores['red']['score'], 'blue' : scores['blue']['score']});
    console.log('sent pit data');
    return true;
  }
}

exports.viewTeam = function(teamNumber, response){
  console.log('getting team data for: ' + teamNumber);
  var values = [parseInt(teamNumber)];
  var doneQueries = [false, false];

  var query = "SELECT * FROM public.\"autoData\" WHERE team_number = $1";//, public.\"teleData\" WHERE team_number = $1";

  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }
    //console.log('got auto');
    doneQueries[0] = true;

    sendTeamData(res, response, true, doneQueries);
  });

  var query = "SELECT * FROM public.\"teleData\" WHERE team_number = $1";//, public.\"teleData\" WHERE team_number = $1";

  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }
    //console.log('got tele');
    doneQueries[1] = true;

    sendTeamData(res, response, false, doneQueries);
  });
};

function sendTeamData(teamData, response, auto, doneQueries){
  summary = {}
  for(i in teamData.rows){
    row = teamData.rows[i];
    summary[i] = {}
    if(auto){
      summary[i]['matchNumber'] = row['match_number'];
      summary[i]['mobility'] = (row['mobility']*1);
      summary[i]['autoGear'] = row['auto_gear'];
      summary[i]['autoGearPickup'] = row['auto_gear_pickup'];
      summary[i]['autoBallPickup'] = (row['auto_ball_pickup']*1);
      summary[i]['autoHigh'] = row['auto_high'];
    }
    else{
      summary[i]['teleGear'] = row['gears_scored'];
      summary[i]['teleGearPickup'] = row['gears_acquired'];
      summary[i]['teleHigh'] = row['tele_high'];
      summary[i]['hangSuccess'] = (row['hang']*1);
      summary[i]['hangDuration'] = row['hang_duration'];
    }
  }
  if(doneQueries[0] == true && doneQueries[1] == true){
    response.render('teamview', {'summmary' : summary});
    console.log('sent data for team');
  }

  //console.log(summary);
//  response.send();
}

exports.submitAuto = function(auto){
  console.log("Submiting Auto");
  var values = Object.keys(auto).map(key => auto[key])
  var query = "INSERT INTO public.\"autoData\"(form_id, team_number, match_number, starting_pos, mobility, auto_ball_pickup, auto_high, auto_low, auto_gear_pickup, auto_pref_lift, auto_gear) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
    }
  });
};

exports.insertMatch = function(match){
  var values = Object.keys(match).map(key => match[key])
  var query = "INSERT INTO public.\"matchSchedule\"(match_number, r1, r2, r3, b1, b2, b3) VALUES ($1, $2, $3, $4, $5, $6, $7);";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
    }
  });
}

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
  var values = Object.keys(form).map(key => form[key]);

  var query = "INSERT INTO public.\"formData\"(form_id, team_number, match_number, gear_bot, shot_bot, defend_bot) VALUES ($1, $2, $3, $4, $5, $6);";
  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
    }
  });
};
