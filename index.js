const express = require('express');
const websiteRoutes = require('./routes/website');
const scoutingRoutes = require('./routes/scouting');

const content = require('./content/content.js').content();

// set variables for environment
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


// Set server port
var port = process.env.PORT || 3001;
app.use('/scripts', express.static(__dirname + '/node_modules/material-components-web/dist/'));

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
console.log('server is running');

app.set('views', [path.join(__dirname, 'views/website'), path.join(__dirname, 'views/scouting')]);
app.set('view engine', 'pug'); // use either jade or ejs

// instruct express to server up static assets
app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', websiteRoutes);
app.use('/scouting', scoutingRoutes);

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', content.home);
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});
