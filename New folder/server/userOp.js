'user strict'
var jwt        = require("jsonwebtoken");
module.exports=function(app,db){

  var getUsers=function(req, res){

                                  var users= db.user.findAll().then(function(todo){

                                     res.json(todo)
                                 })

                         }

  var login=function(req,res){

      var email=req.body.email
      var pass=req.body.password
      var crypto = require('crypto');
      var shasum = crypto.createHash('sha1');
      shasum.update('12345678');
      var password = shasum.digest('hex');
      db.user.find({ where:{email:email,password:password} })
             .then(function(todos){

                      var token = jwt.sign(todos.dataValues, "1236589", {
                          //expiresInMinutes: 1440 // expires in 24 hours
                      });
                      res.json({
                          success: true,
                          message: 'Enjoy your token!',
                          token: token,
                          userinfo:todos.dataValues
                      });

             },function(err){
                      console.log(err)
             })


  }
  var me=function(req,res){

     res.json(req.decoded)
  }

  /*var getSession= function(req,res){

       console.log(req.session)
      console.log(req.sessionID)
       return res.json(req.session.user_info)
  }*/




  var userOperations={
                       getUsers:getUsers,
                       login:login,
                       me:me
                     }
  return userOperations

}




