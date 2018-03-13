var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

mongoose.Promise = global.Promise;

var PitDataSchema = new Schema({
  imageURL: String,
  
  /*
  Other Pit Data information
  */
});

const PitData = mongoose.model('PitData', PitDataSchema, 'PitDatas');

module.exports = PitData;
