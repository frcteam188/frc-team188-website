const Router = require('express').Router;
const routes = Router();

const content = require('../content/content.js').content();

routes.get('/', function(req, res) {
  res.render('index', content.home);
});

routes.get('/form', function(req, res) {
  res.redirect('https://goo.gl/forms/FzTAlDLgkoXhuAxF2');
});

routes.get('/gear', function(req, res) {
  res.redirect('https://goo.gl/forms/0welJw8XAHikSZKC3');
});

routes.get('/schedule', function(req, res) {
  res.render('schedule', content.schedule);
});

routes.get('/about', function(req, res){
  var new_about = content.about
  new_about.pagename = '';
  res.render('about', new_about);
});
routes.get('/about/:pagename', function(req, res) {
  var new_about = content.about
  new_about.pagename = req.params.pagename;
  res.render('about', new_about);
});

routes.get('/frc', function(req, res) {
  res.render('robot', content.frc);
});

routes.get('/events', function(req, res) {
    res.render('events', content.community);
});
routes.get('/vex', function(req, res) {
    res.render('vex', content.vex);
});

routes.get('/sponsors', function(req, res) {
    res.render('sponsors', content.sponsors);
});

module.exports = routes;
