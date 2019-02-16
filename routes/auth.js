
const Router = require('express').Router;
const router = Router();
const jwt = require('jsonwebtoken');

router.get('/login', function(req, res){
    res.render('login', {
        title: 'Login'
    });
});

router.post('/login*', (req, res) => {
    console.log(JSON.stringify(req.body.email));
    console.log(JSON.stringify(req.body.password));
    res.send(
        req.body.email + " logged in." 
    );
});

module.exports = router;