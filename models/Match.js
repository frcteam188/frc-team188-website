var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
const mongoError = require('./mongoHelper');
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


MatchSchema.methods.getMatchData = async function() {
  return MatchData.getMatch(this.number);
};

const Match = mongoose.model('Match', MatchSchema, 'Matches');

module.exports = Match;
