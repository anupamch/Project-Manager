'user strict'
var appObj=require('../app.js')

var app=appObj.app
var Sequelize=require('sequelize')
var fs = require('fs')
var env=app.get('env')=='development'?'dev' : app.get('env')
var dbConfigFile=__dirname+"/dbConfig.json"
var data=fs.readFileSync(dbConfigFile,'utf8')
var dbConfig=JSON.parse(data)[env]
var password=dbConfig.password?dbConfig.password:null
var port=dbConfig.port?dbConfig.port:3306
var connection=new Sequelize(dbConfig.database,dbConfig.user,password,{
                                                                         pool:{
                                                                                host:'localhost' ,
                                                                                dialect:'mysql',
                                                                                port:port,
                                                                                max:5,
                                                                                min:0,
                                                                                idle:10000

                                                                         }


})

connection.authenticate().then(function(err){
             console.log('Connection has been established successfully.');
           },function(err){
             console.log('Unable to connect to the database:'+err);


})

module.exports=connection
