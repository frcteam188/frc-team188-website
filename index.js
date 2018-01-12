// set variables for environment
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var moment = require('moment');
var postgres = require('./sql/postgres_client.js');
var jwt = require('jsonwebtoken');

var content = require('./content/content.js').content();

// Set server port
var port = process.env.PORT || 3001;
app.use('/scripts', express.static(__dirname + '/node_modules/material-components-web/dist/'));
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
console.log('server is running');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/
  res.render('index', content.home);
});

app.get('/about', function(req, res){
  var new_about = content.about
  new_about.pageindex = 0;
  res.render('about', new_about);
});
app.get('/about/:pageindex', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/about
  var new_about = content.about
  new_about.pageindex = req.params.pageindex;
  res.render('about', new_about);
});

app.get('/first', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/about
  res.render('robot', content.first);
});

app.get('/events', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/community
    res.render('events', content.community);
});
app.get('/vex', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/community
    res.render('vex', content.vex);
});

app.get('/sponsors', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/community
    res.render('sponsors', content.sponsors);
});

/*{
  'form_id': 5,
  'teamNumber' : 188,
  'matchNumber' : 2,
  'startingPos' : 0,
  'mobility' : true,
  'autoBallPickup' : true,
  'autoHigh' : 0,
  'autoLow' : true,
  'autoGearPickup' : 0,
  'autoPrefLift' : 0
}*/

app.get('/scouting', function(req, res){

//  res.render('scouting');
  if(req.query.matchNumber != undefined && req.query.station != undefined){
    postgres.getMatch(req.query.matchNumber, req.query.station, res);
  }else{
    res.send('missing query: matchNumber');
  }
});
var scouting_secret = "SutharIsMY5orite";

app.post('/scouting/api/signIn', function(req, res){
  jwt.sign(req.body, scouting_secret, {'expiresIn': '12h'}, function(err, token) {
    if (err){
      console.log(err);
      res.json({'err' : err})
    }
    res.json({'token' : token});
  });
});

app.post('/scouting/api/sendData', function(req, response){
  //console.log(req.query.token);
  //jwt.verify(req.query.token, scouting_secret, function(err, res){
    // if (err){
    //   console.log(err);
    //   res.send(err);
    //   return
    // }
    if (req.body.auto){
    postgres.submitAuto(req.body.auto);
    }
    if (req.body.tele){
      postgres.submitTele(req.body.tele);
    }
    if (req.body.form){
    postgres.submitForm(req.body.form);
    }
    response.send('success');
  //});
});

app.get('/scouting/api/getMatch', function(req, res){
  // jwt.verify(req.query.token, scouting_secret, function(err, res){
  //   if (err){
  //     res.send(err);
  //     return
  //   }

//  });

});
app.get('/scouting/pitStrat', function(req, res){
  // jwt.verify(req.query.token, scouting_secret, function(err, res){
  //   if (err){
  //     res.send(err);
  //     return
  //   }

//  });
  if(req.query.matchNumber != undefined){
    postgres.getPitMatch(req.query.matchNumber, res);
    //postgres.viewTeam(188, res);
  }
  else{
    res.send('missing query: matchNumber');
  }
});

app.get('/scouting/viewTeam', function(req, res){
  // jwt.verify(req.query.token, scouting_secret, function(err, res){
  //   if (err){
  //     res.send(err);
  //     return
  //   }

//  });
  if(req.query.teamNumber != undefined){
    postgres.viewTeam(req.query.teamNumber, res);
  }
  else{
    res.send('missing query: matchNumber');
  }
});


app.get('/scouting/api/query', function(req, res){
  if(req.query.q){
    postgres.query(req.query.q, res);
  }
  else{
    res.render('query', {'names' : [], 'rows' : [], 'query' : ''});
  }
});

app.post('/scouting/api/insertMatch', function(req, res){
  match = req.body;
  if(match != undefined){
    postgres.insertMatch(match);
    res.send('worked');
  }
  else{
    res.send('not worked');
  }
});
