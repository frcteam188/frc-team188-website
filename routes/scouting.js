
const Router = require('express').Router;
const routes = Router();
const jwt = require('jsonwebtoken');

routes.get('/scouting', function(req, res){

//  res.render('scouting');
  if(req.query.matchNumber != undefined && req.query.station != undefined){
    postgres.getMatch(req.query.matchNumber, req.query.station, res);
  }else{
    res.send('missing query: matchNumber');
  }
});

routes.post('/scouting/api/sendData', function(req, response){

    if (req.body.auto){
    //postgres.submitAuto(req.body.auto);
    }
    if (req.body.tele){
      //postgres.submitTele(req.body.tele);
    }
    if (req.body.form){
    //postgres.submitForm(req.body.form);
    }
    response.send('success');
  //});
});

routes.get('/scouting/api/getMatch', function(req, res){


});
routes.get('/scouting/pitStrat', function(req, res){
  if(req.query.matchNumber != undefined){
    //postgres.getPitMatch(req.query.matchNumber, res);
    //postgres.viewTeam(188, res);
  }
  else{
    res.send('missing query: matchNumber');
  }
});

routes.get('/scouting/viewTeam', function(req, res){
  if(req.query.teamNumber != undefined){
    //postgres.viewTeam(req.query.teamNumber, res);
  }
  else{
    res.send('missing query: matchNumber');
  }
});


routes.get('/scouting/api/query', function(req, res){
  if(req.query.q){
    //postgres.query(req.query.q, res);
  }
  else{
    res.render('query', {'names' : [], 'rows' : [], 'query' : ''});
  }
});

routes.post('/scouting/api/insertMatch', function(req, res){
  match = req.body;
  if(match != undefined){
    postgres.insertMatch(match);
    res.send('worked');
  }
  else{
    res.send('not worked');
  }
});

module.exports = routes;
