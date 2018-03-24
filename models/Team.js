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

TeamSchema.statics.getMatches = async function(teamNumber) {
  var output = {}
  var results = await MatchData.getTeam(teamNumber).catch(mongoError);
  console.log(results)
  for (var i in results){
    var data=results[i]

    output[data.matchNumber] ={
      "matchNumber" : data.matchNumber,
      "aPickup": data.autoCubePickup,
      "aAttempted": data.autoCubeAttempt,
      "aScored": data.autoCubeScored,
      "tPickup": data.teleCubePickup,
      "zones": [data.telePickup[1], data.telePickup[2], data.telePickup[3], data.telePickup[4]],
      "own" : data.teleSwitchScored,
      "scale" : data.teleScaleScored,
      "opp" : data.teleOppSwitchScored,
      "exchange": data.teleExchangeScored,
      "hangAttempt" : 1*data.hangAttempt,
      "hangSuccess" : 1*data.hangSuccess,
    }
    console.log(output[data.matchNumber])
  }

  return {"summary" : output, "teamNumber" : teamNumber,
          "names" : ['Station', 'mPlayed', 'aPickup', 'aAttempted', 'aScored',
          'tPickup', 'zones', 'own', 'scale', 'opp', 'exchange', 'hangAtt', 'hangSucc']}
};

const Team = mongoose.model('Team', TeamSchema, 'Teams');


module.exports = Team;
