var exports = module.exports = {};

var pg = require('pg');
const queries = require('./queries.js');

var config = {
  host: 'ec2-184-72-249-88.compute-1.amazonaws.com',
  port: 5432,
  user: 'zittubwkbakzgg',
  password: 'f7b5f0d79b06f89bb93f6afbf3f6854713ad752083f8a4fc6f96882cd4fb99c2',
  database: 'dfs20llq1ohk4r',
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

exports.submitMatch = async function(matchData){
  const {station, teamNumber, matchNumber, cycles, habs} = matchData;
  console.log("Submiting Match: " + station + ', ' + matchNumber);

  try {
    let cyclesClear = await pool.query(queries.clearCycles(matchNumber, teamNumber)); // clear to avoid duplicate data
    if (cycles.length > 0) {
      let cyclesRes = await pool.query(queries.insertCycles(cycles));
    }
    let habsClear = await pool.query(queries.clearHabs(matchNumber, teamNumber));
    if (habs.length > 0) {
      let habsRes = await pool.query(queries.insertHabs(habs));
    }
    let stationRes = await pool.query(queries.updateMatchSubmitted(matchNumber, station));
  } catch (err) {
    console.log(err);
  }
};

exports.getMatch = async function(matchNumber, station, response){
  console.log("Getting Match: " + matchNumber + " for station: " + station);
  try {
    let res = await pool.query(queries.getMatch(matchNumber));
    const data = res.rows[0];
    return {'props': 
    { 'teamNumber': data[station],
      'matchNumber' : matchNumber,
      'station': station,
      'flipped': false
    }};
  }catch (err) {
    console.log(err);
  }
}

exports.getPitMatch = async function(matchNumber, response){
  console.log("Getting pit data for match: " + matchNumber);

  var query = sqeul
    .select()
    .from(CYCLES)
    .where('match = ?', matchNumber)
    .groupBy('robot')
    .toParam();
  try {
    let result = await pool.query(query);
    var stations = ['r1', 'r2', 'r3', 'b1', 'b2', 'b3'];
    var teamNumbers = [];
  }catch (err) {
    console.log(err);
  }
};
exports.getTeam = async function(teamNumber, response){
  console.log("Getting cycles for team: " + teamNumber);
  try {
    let res = await pool.query(queries.getCycles(teamNumber));
    console.log(JSON.stringify(res))
    const data = res.rows;
    return {'props': 
    {
      'data': data,
      'teamNumber' : teamNumber
    }};
  }catch (err) {
    console.log(err);
  }
};
exports.submitMatch = async function(matchData){
  const {station, teamNumber, matchNumber, cycles, habs} = matchData;
  console.log("Submiting Match: " + station + ', ' + matchNumber);

  try {
    let cyclesClear = await pool.query(queries.clearCycles(matchNumber, teamNumber)); // clear to avoid duplicate data
    if (cycles.length > 0) {
      let cyclesRes = await pool.query(queries.insertCycles(cycles));
    }
    let habsClear = await pool.query(queries.clearHabs(matchNumber, teamNumber));
    if (habs.length > 0) {
      let habsRes = await pool.query(queries.insertHabs(habs));
    }
    let stationRes = await pool.query(queries.updateMatchSubmitted(matchNumber, station));
  } catch (err) {
    console.log(err);
  }
};

exports.getMatch = async function(matchNumber, station, response){
  console.log("Getting Match: " + matchNumber + " for station: " + station);
  try {
    let res = await pool.query(queries.getMatch(matchNumber));
    const data = res.rows[0];
    return {'props': 
    {
      'teamNumber': data[station],
      'matchNumber' : matchNumber,
      'station': station,
      'flipped': false
    }};
  }catch (err) {
    console.log(err);
  }
}

const getStation = (robot, schedule) => {
  console.log(schedule);
  for (let key in schedule){
    console.log(key);
    if(schedule[key] === robot) return key;
  }
}

exports.getPitMatch = async function(matchNumber, response){
  console.log("Getting pit data for match: " + matchNumber);

  try {
    let averageResult = await pool.query(queries.getPreMatchAverages(matchNumber));
    let scheduleResult = await pool.query(queries.getMatch(matchNumber));
    let schedule = scheduleResult.rows[0];
    console.log()
    var result = averageResult.rows.map(row => {return {
      'robot': row.robot,
      'station': getStation(row.robot, schedule),
      'mobility': row.mobility,
      'sandstorm_hatch': row.sandstorm_hatch,
      'sandstorm_cargo': row.sandstorm_cargo,
      'cargo_hatch': row.cargo_hatch,
      'cargo_cargo': row.cargo_cargo,
      'rocket_hatch': row.rocket_hatch,
      'rocket_cargo': row.rocket_cargo,
      'climb': row.climb
      }
    });
    var stations = ['r1', 'r2', 'r3', 'b1', 'b2', 'b3'];
    var teamNumbers = [];
    return result;
  }catch (err) {
    console.log(err);
  }
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
      //'mobility' : 0,
      'autoGear' : 0,
      'autoSidePeg' : 0,
      'load' : 0,
      'middle' : 0,
      'boiler' : 0,
      'autoGearPickup' : 0,
      'autoBallPickup' : 0,
      'autoHigh' : 0,
      'teleGear': 0,
      'teleGearPickup' : 0,
    //  'teleHigh' : 0,
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
      //summary[team]['mobility'] += (row['mobility']*1);
      if (row['auto_gear'] === 1 && row['auto_pref_lift'] !== "port2") {
        summary[team]['autoSidePeg'] += 1;
      }
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
  var doneQueries = [false, false];
  var query = "SELECT count(CASE WHEN auto_pref_lift = 'port1' THEN 1 END),count(CASE WHEN auto_pref_lift = 'port2' THEN 1 END),count(CASE WHEN auto_pref_lift = 'port3' THEN 1 END)  FROM public.\"autoData\" WHERE team_number = $1 OR team_number = $2 OR team_number = $3 OR team_number = $4 OR team_number = $5 OR team_number = $6";
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
      //summary[team]['mobility'] += (row['mobility']*1);
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
      //summary[team]['teleHigh'] += row['tele_high'];
      summary[team]['hangSuccess'] += (row['hang']*1);
      summary[team]['hangDuration'] += row['hang_duration']*(row['hang']*1);
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

      if(summary[team]['autoGear'] > 0){
        summary[team]['autoSidePeg']= (summary[team]['autoSidePeg']/summary[team]['autoGear']).toFixed(2);
      }

      for(key in summary[team]){
        if(key != 'hangDuration' && key != 'hangSuccess'
          && key != 'matchesPlayed' && key!='color' && key != 'station'
          && key != 'autoSidePeg'){
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
  var summary = {};


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
  var summary = {};

  var query = "SELECT * FROM public.\"autoData\" WHERE team_number = $1";//, public.\"teleData\" WHERE team_number = $1";

  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }
    //console.log('got auto');
    doneQueries[0] = true;
    if(sendTeamData(res, response, true, doneQueries, summary, teamNumber)){
      return
    }
  });

  query = "SELECT * FROM public.\"teleData\" WHERE team_number = $1";//, public.\"teleData\" WHERE team_number = $1";

  pool.query(query, values, function (err, res) {
    if (err){
      console.log(err);
      response.send(err);
      return
    }
    //console.log('got tele');
    doneQueries[1] = true;
    if(sendTeamData(res, response, false, doneQueries, summary, teamNumber)){
      return
    }
  });
};

function sendTeamData(teamData, response, auto, doneQueries, summary, teamNumber){
  for(i in teamData.rows){
    row = teamData.rows[i];
    if(!summary[i]){
      summary[i] = {}
    }
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
  console.log(doneQueries[0] + ': ' + doneQueries[1]);
  if(doneQueries[0] && doneQueries[1]){
    console.log(summary);
    response.render('teamview', {'summary' : summary, 'teamNumber' : teamNumber});
    console.log('sent data for team');
    return true;
  }
  return false;

  //console.log(summary);
//  response.send();
}



exports.insertMatch = async function(match){
  var values = Object.keys(match).map(key => match[key])
  // var query = "INSERT INTO public.\"matchSchedule\"(match_number, r1, r2, r3, b1, b2, b3) VALUES ($1, $2, $3, $4, $5, $6, $7);";
  console.log(match);
  console.log(queries.insertMatch(match))
  return pool.query(queries.insertMatch(match));
}

exports.query = function(query, response){
  console.log("TRYING QUERY : " + query);
  pool.query(query, function (err, res) {
    if (err){
      console.log(err);
    }
    else{
      names = [];
      for(index in res.fields){
        names.push(res.fields[index].name);
      }
      response.render('query', {"names":names, "rows": res.rows, 'query' : query});
      console.log(res);
    }
  });
}
