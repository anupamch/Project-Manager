'user strict'
var jwt        = require("jsonwebtoken");
module.exports=function(app,db){
  var userOperations={}
  userOperations.getUsers=function(req, res){
                                 var where={user_status:{$ne:3}}
                                 
                                 var self_id=req.query.self_id
                                 if(self_id!=undefined)
                                     where={user_status:{$ne:3},id:{$ne:self_id}}
									 	
									 
                                  var users= db.user.findAll({where:{user_status:{$ne:3},id:{$ne:self_id}},include: [db.user_type]}).then(function(todo){

                                     res.json(todo)
                                 })

                         }
  userOperations.getUsersById=function(req, res){
                                  var id=req.query.id 
                                  var users= db.user.findAll({where:{id:id},include: [db.user_type]}).then(function(todo){

                                     res.json(todo)
                                 })

                         }
  userOperations.getUsersByType=function(req, res){
                                  var id=req.query.type_id 
                                  var users= db.user.findAll({where:{user_type_id:id},include: [db.user_type]}).then(function(todo){

                                     res.json(todo)
                                 })

                         }							 						 

 userOperations.login=function(req,res){

      var email=req.body.email
      var pass=req.body.password
      var crypto = require('crypto');
      var shasum = crypto.createHash('sha1');
      shasum.update('12345678');
      var password = shasum.digest('hex');
      db.user.find({ where:{email:email,password:password} })
             .then(function(todos){
                    if(todos){
                      var token = jwt.sign(todos.dataValues, "1236589", {
                          //expiresInMinutes: 1440 // expires in 24 hours
                      });
                      res.json({
                          success: true,
                          message: 'Enjoy your token!',
                          token: token,
                          userinfo:todos.dataValues
                      });
					}
					else
					{
						res.json({
                          success: false,
                          message: 'Wrong email or Password',
                          token: "",
                          userinfo:""
                      });
					}

             },function(err){
                      console.log(err)
             })


  }
  userOperations.me=function(req,res){

     res.json(req.decoded)
  }

  /*var getSession= function(req,res){

       console.log(req.session)
      console.log(req.sessionID)
       return res.json(req.session.user_info)
  }*/

  userOperations.getUserByEmail=function(req,res){
	      email=req.body.email 
	      db.user.find({ where:{email:email} })
		          .then(function(todos){
					         if(todos){
								    res.json({ success: true});
															 
							  }
							  else{
								    res.json({ success: false});
								   
							  }
								 
					  
					     }) 
	  
	  }
   userOperations.getGroups=function(req,res){
	     
	      db.group.findAll()
		          .then(function(todos){
					         
							 res.json(todos)	 
					  
					     }) 
	  
	  }	 
	 
	 userOperations.getUserType=function(req,res){
	     
	      db.user_type.findAll()
		          .then(function(todos){
					         
							 res.json(todos)	 
					  
					     }) 
	  
	  }	   
    userOperations.saveUser=function(req,res){
		    var user_info=JSON.parse(req.body.user_info)
			var crypto = require('crypto');
      var shasum = crypto.createHash('sha1');
      shasum.update(user_info.password);
      user_info.password = shasum.digest('hex');
			 db.user.create(user_info) 
			        .then(function(todos){
					         
							 res.json(todos)	 
					  
					     }) 
			
		}
    userOperations.editUser=function(req,res){
		       
		   var user_info=JSON.parse(req.body.user_info)
			var id=req.body.id
			if(user_info.password!=null){
				  var crypto = require('crypto');
				  var shasum = crypto.createHash('sha1');
				  shasum.update(user_info.password);
				  user_info.password = shasum.digest('hex');
			}
			 db.user.update(user_info,{where:{id:id}}) 
			        .then(function(todos){
					         
							 res.json(todos)	 
					  
					     }) 
		}
  
  	userOperations.updateProfileImage=function(req,res){
  		
  		 var file_name=req.body.filenmae
  		 var id=req.body.id
  		 db.user.update({prof_image:file_name},{where:{id:id}}) 
			        .then(function(todos){
					         
							 res.json(file_name)	 
					  
					     }) 
		
	}			 
  return userOperations

}




