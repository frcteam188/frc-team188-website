var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
const mongoError = require('./MongoHelper');
const MatchData = require('./MatchData')

mongoose.Promise = global.Promise;

var TeamSchema = new Schema({
  number: Number,
  pitData: { type: Schema.ObjectId, ref: 'PitData' }
});


TeamSchema.statics.get = async function(teamNumber) {
    return await this.findOne()
      .where('number').equals(teamNumber)
      .exec().catch(mongoError);

  };

TeamSchema.methods.getMatches = async function() {
  return MatchData.getTeam(this.number);
};

const Team = mongoose.model('Team', TeamSchema, 'Teams');


module.exports = Team;
