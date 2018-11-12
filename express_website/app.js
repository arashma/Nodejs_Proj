var express = require('express');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var path       = require('path');

var app = new express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
  res.render('index',{ title: 'Home' });
});

app.get('/about',function(req,res){
  res.render('about',{ title: 'About' });
});

app.get('/contact',function(req,res){
  res.render('contact',{ title: 'Contact' });
});
app.post('/contact',function(req,res){
var trasporter = nodemailer.createTransport({
  service:"Gmail",
  auth:{
    user:"arashdevelopermind@gmail.com", //set your email
    pass:''  //set your pass
  }
});
var mailOptoin = {
  from: 'Arash alidadi <arashdevelopermind@gmail.com>',
  to: 'support@mysite.com' ,
  subject: "Test mail" ,
  text:   `You have mail from ${req.body.name} by mail ${req.body.email}  and message is ${req.body.message}  ` ,
  html:`<p>You have message </p> <ul>
    <li>name ${req.body.name} </li>
    <li>email ${req.body.email} </li>
    <li>Message ${req.body.message} </li>
  </ul>`
};

trasporter.sendMail(mailOptoin, function(err){
  if(err){
    console.log("error");
    res.redirect("/");
  }else{
    console.log("Sent mail");
    res.redirect("/");
  }
})

});
app.listen(3000);
console.log("Listening on http://127.0.0.1:3000");
