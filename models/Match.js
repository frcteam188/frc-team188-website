var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
const mongoError = require('./MongoHelper');
const MatchData = require('./MatchData')

mongoose.Promise = global.Promise;

var MatchSchema = new Schema({
  number: Number,
  r1: Number,
  r2: Number,
  r3: Number,
  b1: Number,
  b2: Number,
  b3: Number
});


MatchSchema.statics.saveOne = async function(match){
  return await this.findOneAndUpdate(
    {number: match.number},
    match,
    {upsert: true})
    .exec().catch(mongoError)
}

MatchSchema.statics.get = async function(matchNumber, station) {
  result = await this.findOne()
    .where('number').equals(matchNumber)
    .exec().catch(mongoError);
  result = result.toObject();
  result.station = station;
  result.teamNumber = result[station];
  console.log(result);
  return result;
};

const averageTemplate = {
  "matchesPlayed" : 0,
  "aPickup": 0, "aAttempted": 0, "aScored": 0,
  "tPickup": 0, "zones": {},
  "own" : 0, "scale" : 0, "opp" : 0, "exchange": 0,
  "hangAttempt" : 0, "hangSuccess" : 0}

const zoneTemplate = {1 : 0, 2 : 0, 3 : 0, 4 : 0}

MatchSchema.statics.getMatchData = async function(matchNumber) {
  var output = {"r1" : {}, "r2" : {}, "r3" : {}, "b1" : {}, "b2" : {}, "b3" : {}}
  var averages
  match = await this.findOne()
    .where('number').equals(matchNumber)
    .exec().catch(mongoError);

  results = await MatchData.getMatch(match.number).catch(mongoError);

  for (var i in results){
    var data=results[i]
    var key
    for(k in match){
      if (match[k] === data.teamNumber){
        key = k
      }
    }


    output[key] ={
      "matchesPlayed" : '/',
      "aPickup": data.autoCubePickup,
      "aAttempted": data.autoCubeAttempt,
      "aScored": data.autoCubeScored,
      "tPickup": data.teleCubePickup,
      "zones": {1: data.telePickup[1], 2: data.telePickup[2], 3: data.telePickup[3], 4: data.telePickup[4]},
      "own" : data.teleSwitchScored,
      "scale" : data.teleScaleScored,
      "opp" : data.teleOppSwitchScored,
      "exchange": data.teleExchangeScored,
      "hangAttempt" : 1*data.hangAttempt,
      "hangSuccess" : 1*data.hangSuccess,
    }
  }

  matchPlayed = true
  if (results.length === 0){ // this match has not been played yet, show averages for the teams
    matchPlayed = false
    teams = [match.r1, match.r2, match.r3, match.b1, match.b2, match.b3]
    teamDatas = await MatchData.getTeams(teams).catch(mongoError);
    averages = {}

    for (var i in teamDatas){
      data = teamDatas[i]
      teamNumber = data.teamNumber
      if (averages[teamNumber] === undefined){
        averages[teamNumber] = {...averageTemplate} //using spread operator to clone the template
        averages[teamNumber].zones = {...zoneTemplate}
      }
      averages[teamNumber].matchesPlayed += 1
      averages[teamNumber].aPickup += data.autoCubePickup
      averages[teamNumber].aAttempted += data.autoCubeAttempt
      averages[teamNumber].aScored += data.autoCubeScored
      averages[teamNumber].tPickup += data.teleCubePickup
      for (var j = 1; j <= 4; j++){
        averages[teamNumber].zones[j] += data.telePickup[j]
      }
      averages[teamNumber].own += data.teleSwitchScored
      averages[teamNumber].scale += data.teleScaleScored
      averages[teamNumber].opp += data.teleOppSwitchScored
      averages[teamNumber].exchange += data.teleExchangeScored
      averages[teamNumber].hangAttempt += 1*data.hangAttempt
      averages[teamNumber].hangSuccess += 1*data.hangSuccess
    }
    console.log(averages)
    for(var teamNumber in averages){
      averages[teamNumber]["hangSuccess"] = (averages[teamNumber]["hangSuccess"]/averages[teamNumber]["hangAttempt"]).toFixed(2)
      for(var key in averages[teamNumber]){
        // for (var j = 1; j <= 4; j++){
        //   averages[teamNumber].zones[j] = (averages[teamNumber].zones[j]/averages[teamNumber]["matchesPlayed"]).toFixed(1)
        // }
        if(key !== "hangSuccess" && key !== "matchesPlayed" && key !== "zones"){
          averages[teamNumber][key] = (averages[teamNumber][key]/averages[teamNumber]["matchesPlayed"]).toFixed(2)
        }
      }
    }
  }

  for (var key in output){
    if(averages !== undefined){
      output[key] = averages[match[key]] || {}
    }
    if (output[key]["zones"] !== undefined){
      output[key]["zones"] = Object.values(output[key]["zones"]).toString()
    }
    output[key]["teamNumber"] = match[key]
    output[key]["color"] = key[0]==='r'?'#ba3248':'#4286f4'
  }

  return {"summary" : output, "matchNumber" : match.number,
          "names" : ['Station', 'mPlayed', 'aPickup', 'aAttempted', 'aScored',
          'tPickup', 'zones', 'own', 'scale', 'opp', 'exchange', 'hangAtt', 'hangSucc']}
};

const Match = mongoose.model('Match', MatchSchema, 'Matches');

module.exports = Match;
