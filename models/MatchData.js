var mongoose     = require('mongoose');
const mongoError = require('./MongoHelper');
var Schema       = mongoose.Schema;

mongoose.Promise = global.Promise;

var MatchDataSchema = new Schema({
  matchNumber: Number,
  teamNumber: Number,
  tournament: String,
  value: Number
  /*
  all of the data
  */
});

MatchDataSchema.statics.saveOne = async function(matchData){
  console.log(matchData);
  return await this.findOneAndUpdate(
    {matchNumber: matchData.matchNumber, teamNumber: matchData.teamNumber},
    matchData,
    {upsert: true})
    .exec().catch(mongoError)
}

MatchDataSchema.statics.getMatchData = async function(matchNumber, teamNumber) {
  return await this.findOne()
    .where('matchNumber').equals(matchNumber)
    .where('teamNumber').equals(teamNumber)
    .exec().catch(mongoError)
}

MatchDataSchema.statics.getMatch = async function(matchNumber) {
  return await this.find()
    .where('matchNumber').equals(matchNumber)
    .exec().catch(mongoError)
}

MatchDataSchema.statics.getTeam = async function(teamNumber) {
  return await this.find()
    .where('teamNumber').equals(teamNumber)
    .exec().catch(mongoError)
}

const MatchData = mongoose.model('MatchData', MatchDataSchema, 'MatchDatas');

module.exports = MatchData;
