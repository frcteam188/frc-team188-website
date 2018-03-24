var mongoose     = require('mongoose');
const mongoError = require('./MongoHelper');
var Schema       = mongoose.Schema;

mongoose.Promise = global.Promise;

var MatchDataSchema = new Schema({
  matchNumber: Number,
  teamNumber: Number,
  tournament: String,
  value: Number,

  cubesAcquired : Number,
  cubesScored : Number,

  startingPos : String,
  mobility : Boolean,

  autoPyramid : Number,
  autoGround : Number,
  autoCubePickup : Number,
  autoExchangeAttempt : Number,
  autoExchangeScored : Number,
  autoSwitchFarAttempt : Number,
  autoSwitchFarScored : Number,
  autoSwitchNearAttempt : Number,
  autoSwitchNearScored : Number,
  autoScaleFarAttempt : Number,
  autoScaleFarScored : Number,
  autoScaleNearAttempt : Number,
  autoScaleNearScored : Number,
  autoCubeAttempt : Number,
  autoCubeScored : Number,

  ownSwitchFarAttempt : Number,
  ownSwitchFarScored : Number,
  ownSwitchNearAttempt : Number,
  ownSwitchNearScored : Number,
  scaleFarAttempt : Number,
  scaleFarScored : Number,
  scaleNearAttempt : Number,
  scaleNearScored : Number,
  oppSwitchFarAttempt : Number,
  oppSwitchFarScored : Number,
  oppSwitchNearAttempt : Number,
  oppSwitchNearScored : Number,
  teleExchangeAttempt : Number,
  teleExchangeScored : Number,
  telePickup : {1: Number, 2: Number, 3: Number, 4 : Number, humanLoadNear: Number, humanLoadFar: Number},
  teleCubePickup : Number,
  teleCubeAttempt : Number,
  teleCubeScored : Number,

  park : Boolean,
  carried : Boolean,
  hangAttempt : Boolean,
  hangSuccess : Boolean,
  noCarried : Number,
  comments : String,

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
