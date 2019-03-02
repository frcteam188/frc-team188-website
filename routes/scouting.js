
const Router = require('express').Router;
const routes = Router();
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const Match = require('../models/Match')
const MatchData = require('../models/MatchData')
const Team = require('../models/Team')

const mongoURI = process.env.MONGOURI ||

 'mongodb://roland:Anderson'+
                   '@scouting2018-shard-00-00-prx1p.mongodb.net:27017,'+
                   'scouting2018-shard-00-01-prx1p.mongodb.net:27017,'+
                   'scouting2018-shard-00-02-prx1p.mongodb.net:27017/'+
                   'daly?replicaSet=Scouting2018-shard-0&ssl=true&authSource=admin'
console.log(mongoURI);
//'mongodb://localhost/scouting2018'

mongoose.connect(mongoURI);


routes.get('/', function(req, res){
//  res.render('scouting');

  console.log(req.query);
  if(req.query.matchNumber != undefined && req.query.station != undefined){
    res.render('scouting',{
      'teamNumber': 188,
      'matchNumber' : 1,
      'station': req.query.station
      });
  }else{
    res.send('missing query: matchNumber or stationNumber');
  }
});


routes.get('/getTeamData', function(req, res){
  if(req.query.teamNumber != undefined){
    MatchData.getTeam(req.query.teamNumber)
      .then(sendResult(req, 'teamview', res), sendFailure(res));
  }else{
    res.send('missing query: teamNumber')
  }
});

routes.get('/pitStrat', function(req, res){
  if(req.query.matchNumber != undefined){
    Match.getMatchData(req.query.matchNumber)
      .then(sendResult(req, 'pitstrat', res), sendFailure(res));
  }
  else{
    res.send('missing query: matchNumber');
  }
});

routes.get('/viewTeam', function(req, res){
  if(req.query.teamNumber != undefined){
    Team.getMatches(req.query.teamNumber)
      .then(sendResult(req, 'teamview', res), sendFailure(res));
  }
  else{
    res.send('missing query: teamNumber');
  }
});


// routes.get('/api/query', function(req, res){
//   if(req.query.q){
//
//   }
//   else{
//     res.render('query', {'names' : [], 'rows' : [], 'query' : ''});
//   }
// });

routes.post('/submitMatchData', function(req, res){
  //const matchData = new MatchData(req.body);
  req.query.api = 'true'
  MatchData.saveOne(req.body)
    .then(sendResult(req, '', res), sendFailure(res));
});

routes.post('/insertMatch', function(req, res){
  req.query.api = 'true'
  if(req.body != undefined){
    Match.saveOne(req.body)
      .then(sendResult(req, '', res), sendFailure(res));
  }
  else{
    res.send('missing body');
  }
});

function sendResult(req, view, res){
  return function(result){
    if(req.query.api === 'true'){
      res.json(result);
    }
    else{
      res.render(view, result)
    }
  };
};

function sendFailure(res){
  return function(err){
      console.log(err);
      res.send('Failed at database, check logs')
  };
};

module.exports = routes;
