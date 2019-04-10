"use strict";
var querystring = require('querystring');
var userOp=require('./server/userOp');
var projectOp=require('./server/projectOp');

var jwt        = require("jsonwebtoken");


module.exports=function(appObj,db){
    var app=appObj.app
    var express=appObj.express
    var userModel=userOp(app,db)
	var projectModel=projectOp(app,db)
    var apiRoutes = appObj.express.Router();
    var serurtoken=""
    app.use(function (req, res, next) {


        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization');
        serurtoken=req.headers['authorization']

        next();

    });
    app.use('/public', express.static('public'));

    app.get('/', function(req, res) {

        res.sendFile(__dirname+'/public/index.html');

    })

    app.all('/api/*', function (req, res, next) {


        //serurtoken=serurtoken.toString().split(" ")
        if(serurtoken !=undefined  && serurtoken!=""){

            jwt.verify(serurtoken.split(" ")[1], "1236589", function(err, decoded) {
                if (err) {
                     res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;

                    next();
                }
            });

        }
        else {

            res.json({ success: false, message: 'Failed to authenticate token.' })
        }

    });
   
    app.get("/api/users",userModel.getUsers)
    app.get("/api/me",userModel.me)
    app.post("/auth",userModel.login)
	app.post("/api/getUserByEmail",userModel.getUserByEmail)
    app.get("/api/getGroups",userModel.getGroups)
	app.get("/api/getUserType",userModel.getUserType)
	app.post("/api/saveUser",userModel.saveUser)
	app.get("/api/getUsersById",userModel.getUsersById)
	app.post("/api/editUser",userModel.editUser)
	app.post("/api/changeUserPassword",userModel.editUser)
	app.get("/api/getUsersByType",userModel.getUsersByType)
	app.post("/api/updateProfileImage",userModel.updateProfileImage)
	
	
	app.get("/api/getProjectType",projectModel.getProjectType)
	app.get("/api/getProjects",projectModel.getProjects)
	app.post("/api/uploadDocument",projectModel.uploadDocument)
	app.post("/api/createProject",projectModel.createProject)
	app.post("/api/storeProjectDocName",projectModel.storeProjectDocName)
	app.post("/api/removeFile",projectModel.removeFile)
	app.get("/api/getSingleProjects",projectModel.getSingleProjects)
	app.post("/api/updateProject",projectModel.updateProject)
	app.get("/api/getProjectComment",projectModel.getProjectComment)
	app.post("/api/addProjectcomment",projectModel.addProjectcomment)
	app.post("/api/storeCommentDocName",projectModel.storeCommentDocName)
    

/*****************************************************************/






}
