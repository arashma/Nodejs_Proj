var express           = require('express');
var multer            = require('multer');
var upload            = multer({dest:'./uploads'});
var User              = require('../models/user');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',ensureAuthenticated, function(req, res, next) {
    res.render('register',{errors:'',title:"Register"});
});

//if user Authenticated that not access to login and register page
function ensureAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        res.redirect('/');
    }else{
        return next();
    }
}

router.get('/login',ensureAuthenticated, function(req, res, next) {
    res.render('login',{ title: 'Login' });
});


router.post('/login',
    passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid username or password'}),
    function(req, res) {
      req.flash('success','You are now logded in ');
      res.redirect('/');
    });

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function (username,password,done) {
    User.getUserByUsername(username , function (err,user) {
        if(err) throw err;
        if(!user){
            return done(null,false , {message:'Invalid Username'});
        }
        User.comparePassword(password,user.password  , function (err,isMatch) {
            if (err) return done(err);
            if (isMatch){
                return done(null,user)
            }else{
                return done(null,false,"Invalid Password");
            }
        })
    })
}));



router.post('/register',upload.single('profileimage'), function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password,
        profileimage: profileimage
    });

    if (req.file) {
        var profileimage = req.file.filename;
        console.log("File Uploaded")
    } else {
        var profileimage = "noimage.jpg";
        console.log("File Not Uploaded")
    }

    ///Form Validator
    req.checkBody('name', 'Name Field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('email', 'Email Field is required').notEmpty();
    req.checkBody('username', 'Username Field is required').notEmpty();
    req.checkBody('password', 'Password Field is required').notEmpty();
    req.checkBody('password2', 'Password is not match').equals(req.body.password);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        res.render('register', {
            errors: errors,
            title: 'Register'
        })
    } else {
        User.createUser(newUser, function (err, user) {
            if (err) {
                throw err;
            } else {
                req.flash('success', 'You are registered and can login.');
                res.location('/');
                res.redirect('/');
            }
        });
    }

});

router.get('/logout',function (req,res) {
    req.logout();
    req.flash('success','You are now logged out');
    res.redirect('/users/login');
});
module.exports = router;
