'user strict'
var appObj=require('./bin/app.js')
var app=appObj.app




var express=appObj.express
var connection=require('./bin/db/models')

var bodyParser = require('body-parser');
var querystring = require('querystring');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var path = require('path');
//var session = require('express-session');

var os = require("os");

/*app.use(session({
	secret: '12jj23ju2j823j28283;123',
	resave: false,

	saveUninitialized: true,
    cookie: {
        path: '/',
        domain: os.hostname(),
        maxAge: 1000 * 60 * 24 // 24 hours
    }


	}));*/



  app.use(express.static(__dirname + '/'))







connection.db.sync({force:false}).then(function(data){

    var router=require('./router.js')
    router(appObj,connection)

    //INSERT DEFAULT ROWS
    connection.user.findOne({where:{
          email:'admin@g.com'
      }}).then(function(todo){

          if(todo==null || todo=='' || todo=='null')
          {
              var setDefault=require('./defaultRows.js')
              setDefault(connection)
          }

      })



      var port=process.env.POST || 5000

    //Listen the Port
      var server=app.listen(port,function(){

          console.log('Server Running')
      });

  },function(e){

      console.log(e)

  })
