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

const averages = {
  "aPickup": 0, "aAttempted": 0, "aScored": 0,
  "tPickup": 0, "zones" : {1 : 0, 2 : 0, 3 : 0, 4 : 0},
  "own" : 0, "scale" : 0, "opp" : 0, "exchange": 0,
  "hangAttempt" : 0, "hangSuccess" : 0}

MatchSchema.methods.getMatchData = async function() {
  results = await MatchData.getMatch(this.number).catch(mongoError);
  if (results === []){ // this match has not been played yet, show averages for the teams
    teams = [this.r1, this.r2, this.r3, this.b1, this.b2, this.b3]
    teamDatas = await MatchData.getTeams(teams).catch(mongoError);
    for (data in teamDatas){

    }
  }
};

const Match = mongoose.model('Match', MatchSchema, 'Matches');

module.exports = Match;
