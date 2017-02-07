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
    'name' : 'Events',
    'url' : '/events'
  },
  // {
  //   'name' : 'Outreach',
  //   'url' : '/outreach'
  // },
  {
    'name' : 'VEX',
    'url' : '/vex'
  },
  {
    'name' : 'FRC',
    'url' : '/first',
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
  },
  {
    'name' : 'Sponsors',
    'url' : '/sponsors'
   }
];

var routes = [
  {'name': 'Home',
   'url': '/'},
  {'name': 'About',
   'url': '/about'},
  {'name': 'FIRST',
   'url': '/first'},
  {'name': 'FLL',
   'url': '/fll'},
  {'name': 'Vex',
  'url': '/vex'},
  {'name': 'Sponsors',
   'url': '/sponsors'},
  {'name': '2016',
    'url': '/first/2016'}
];

var home = {
  'menu': menu,
  'description': 'We are Team 188, a high school robotics team based out of Scarborough, Ontario. We were the first-ever canadian FRC team and we strive to make a positive impact in our school and our community.',
  'routes' : routes
};

var about = {
  'menu' : menu,
  'paras' : [
    {'title' : 'About Us',
     'para' : 'Woburn Robotics is an extracurricular high school robotics team based at Woburn Collegiate Institute in Toronto, Canada, which gathers every year to take part in the FIRST FIRST Robotics Competition, an international contest that teams students up with engineers and sponsors from local businesses to develop skills in science, technology, marketing, and leadership. In six intense weeks the team brainstorms, designs, constructs, and tests its 120-pound robot for the competition, whose objective is different every year. The robots are then immediately shipped off to compete in enormous tournaments (including the Greater Toronto Regional).'
   },
   {'title' : 'Outreach',
    'para' : 'This is where we can talk about our outreach and blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah'
   }
 ],
  'routes' : routes
};

var first = {
  'menu' : menu,
  'routes' : routes

};

var community = {
  'menu' : menu,
  'routes' : routes
};

var vex = {
  'menu' : menu,
  'paras' : [
    {
      'title' : 'Vex Robotics Competition',
      'para' : 'Every year Team 188 competes in our annual Vex Robotics Tournament. Here are some of the robots we have made in the past.'
    }
  ],
  'routes' : routes
}

var sponsors = {
  'menu' : menu,
  'paras' : [
    {
      'title' : 'Our Sponsors',
      'para' : 'Our team is incredibly gratefull for all of our sponsors and their role in making Team 188 possible.'
    }
  ],
  'routes' : routes
};


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
  res.render('index', home);
});

app.get('/about', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/about
  res.render('about', about);
});

app.get('/first', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/about
  res.render('robot', first);
});

app.get('/events', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/community
    res.render('events', community);
});
app.get('/vex', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/community
    res.render('vex', vex);
});

app.get('/sponsors', function(req, res) {//this block defines what our server will do when it receives a request at the url: team188.com/community
    res.render('sponsors', sponsors);
    //res.send(req.query.team);
    //res.json({'name' : 'hi'});
});
app.post('/posttest', function(req, res){
  //res.json({'name' : req.name});
  console.log(req.body);
  res.send();
  // res.json();
  //res.render('sponsors', sponsors);
});
