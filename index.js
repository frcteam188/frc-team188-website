// set variables for environment
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var data = require("./data.json");
var moment = require('moment');
console.log(data);
// Set server port
var port = process.env.PORT || 3001;

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
  res.render('index');
});
