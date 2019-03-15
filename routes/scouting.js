
const Router = require('express').Router;
const routes = Router();
const jwt = require('jsonwebtoken');
const pg = require('../sql/dbwrapper.js');

routes.get('/', function(req, res){
//  res.render('scouting');
  const {matchNumber, station} = req.query;
  console.log(req.query);
  if(matchNumber != undefined && station != undefined){
    pg.getMatch(matchNumber, station, res).then(result => {
      res.render('scouting', result);
    });
  }else{
    res.send('missing query: matchNumber or station');
  }
});

routes.post('/submitMatchData', function(req, res){
  const matchData = req.body;
  console.log(matchData);
  req.query.api = 'true';
  pg.submitMatch(req.body).then(res.send(200));
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
    pg.getPitMatch(req.query.matchNumber).then(response => {
      console.log(response);
      res.render('pitstrat', {'props': 
      {
        'matchNumber': req.query.matchNumber,
        'data': response
      }});
    })
  }
  else{
    res.send('missing query: matchNumber');
  }
});

routes.get('/teamView', function(req, res){
  if(req.query.teamNumber != undefined){
    pg.getTeam(req.query.teamNumber, res).then(result => {
      res.render('teamview', result)
    })
  }else{
    res.send('missing query: teamNumber')
  }
});

routes.post('/submitMatchData', function(req, res){
  const matchData = req.body;
  console.log(matchData);
  req.query.api = 'true';
  pg.submitMatch(req.body);
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



routes.post('/insertMatch', function(req, res){
  req.query.api = 'true'
  if(req.body != undefined){
    pg.insertMatch(req.body)
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
