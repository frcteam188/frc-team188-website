
const Router = require('express').Router;
const router = Router();
const db = require('../models/db_wrapper.js');
const jwt = require('jsonwebtoken');
const uid = require('uid2');
const bcrypt = require('bcrypt');

db.getUser("parth@me");
var user = {
    name: "Parth",
    password: bcrypt.hashSync("188", 12),
    role: "user",
    email: "parth@188"
}
db.addUser(user)
db.getUser("parth1926@gmail.com");
db.getUser("parth1926@mail.com");
router.get('/login', function(req, res){
    res.render('login', {
        title: 'Login'
    });
});

router.get('/register', function(req, res){
    res.render('register', {
        title: 'Register'
    });
});

router.post('/login*', (req, res) => {
    user = db.getUser(req.body.email);

    const errFlags = {};
    if(!user){
        errFlags.userErr = true;
        console.log("auth: user not found")
    }
    else if(!bcrypt.compareSync(req.body.password, user.password)){
        console.log("wrong password");
        errFlags.passErr = true;
    }

    console.log(Object.keys(errFlags).length === 0 && errFlags.constructor === Object)

    if(Object.keys(errFlags).length === 0 && errFlags.constructor === Object){
        res.cookie(users.getAuthCookieName(), `${uid(32)};${user.uid}`, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 90, // ms * ms in s * s in min * min in hr * hr in days - 3 months
        });
        res.redirect('/')
    

        /* TODO:  REDIRECT AFTER SUCCESSFUL LOGIN
        */  
    } else {
            res.render('auth/login', {
            title: 'Login',
            nextPath: req.query.next,
            err: errFlags,
            });
    }
});

router.post('/register*', (req, res) => {
    db.addUser(req.body);


})

module.exports = router;
