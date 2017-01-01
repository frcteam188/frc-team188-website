// set variables for environment
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var moment = require('moment');
var menu = [
  {
    'name' : 'Home',
    'url' : '/'
  },
  {
    'name' : 'About',
    'url' : '/about'
  },
  {
    'name' : 'Mentors',
    'url' : '/mentors'
  },
  {
    'name' : 'FLL',
    'url' : '/fll'
  },
  {
    'name' : 'VEX',
    'url' : '/vex'
  },
  {
    'name' : 'FRC',
    'url' : '/frc',
    'options' : [
      {
        'name' : '2016',
        'url' : '/2016'
      },
      {
        'name' : '2015',
        'url' : '/2015'
      },
      {
        'name' : '2014',
        'url' : '/2014'
      },
      {
        'name' : '2012',
        'url' : '/2012'
      },
      {
        'name' : '2011',
        'url' : '/2011'
      }
    ]
  }
];
var data = {
  'menu': menu,
  'description': 'We are Team 188, a hichschool robotics team based out of Scarborough Ontario'

};
// Set server port
var port = process.env.PORT || 3000;
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

app.get('/', function(req, res) {
  res.render('index', data);
});
