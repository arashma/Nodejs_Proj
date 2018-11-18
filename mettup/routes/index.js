var express = require('express');
var router = express.Router();
var appdata = require('../data');
/* GET home page. */
router.get('/', function(req, res, next) {
    var myartwork = [];
    var myartists  = appdata.speakers;
    appdata.speakers.forEach(function (item) {
        myartwork = myartwork.concat(item.artwork);
    });


    res.render('index', {
        title: 'Home',
        artwork : myartwork,
        artist : myartists,
        page  : 'home'
    });
});

/* GET speakers page. */
router.get('/speakers', function(req, res, next) {
    var myartwork = [];
    var myartists  =  appdata.speakers;

    appdata.speakers.forEach(function (item) {
        myartwork = myartwork.concat(item.artwork);
    });

    res.render('speakers', {
        title: 'speakers',
        artwork : myartwork,
        artist : myartists,
        page :'artistList'
    });
});

/* GET artist list page. */
router.get('/speakers/:speakerid', function(req, res, next) {
    var myartwork = [];
    myartists = [];

    appdata.speakers.forEach(function (item) {
        if (item.shortname == req.params.speakerid) {
            myartists.push(item);
            myartwork = myartwork.concat(item.artwork);
        };
    });

    res.render('speakers', {
        title: 'speakers',
        artwork : myartwork,
        artist : myartists,
        page : 'artistDetail'
    });
});

module.exports = router;
