'user strict'

var multer = require('multer');
var fs = require('fs');
const path = require('path');
const current_dir=path.resolve(__dirname)
var filenames_obj=[]
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
			filename=file.originalname.split('.')[0]+datetimestamp+'.'+file.originalname.split('.')[file.originalname.split('.').length -1]
			filenames_obj.push(filename)
            cb(null, filename)
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
								
module.exports=function(app,db){

  var projectObj={}
  // var upload=require('../fileupload_mod.js')
  

  projectObj.getProjects=function(req,res){
	      var user_type_id=req.query.user_type_id
	      var id=req.query.id
	      var where={}
	      if(user_type_id==7)
	      {
		  	where={client_id:id}
		  }  
	       db.project.findAll({
	       	                where:where,
	       	                include:[
	       	                            {model:db.user,as:"pm" },
	       	                            {model:db.user,as:"client"},
	       	                            {model:db.user,as:"introduced"}
	       	                        ]
	       	                 })
		                  .then(function(todo){
							  
							      res.json(todo)
							  
							  })
	  
	  }
  projectObj.getSingleProjects=function(req,res){
	       var id=req.query.id
	       db.project.findOne({
	       	                where:{id:id},   
	       	                
	       	                include:[
	       	                            {model:db.user,as:"pm" },
	       	                            {model:db.user,as:"client"},
	       	                            {model:db.user,as:"introduced"},
	       	                            {model:db.user,as:"editedby"},
	       	                            {model:db.project_document},
	       	                            {model:db.project_type}
	       	                            
	       	                        ]
	       	                 })
		                  .then(function(todo){
							  
							  todo.getUsers().then(function(response){
							  	
							  	var datas={members:response,project:todo}
							  
							  	
							  	res.json(datas)
							  	
							  })
							  
							      
							      
								
								
							})
							  
							  
	  
	  }
  
  projectObj.getProjectType=function(req,res){
	  
	       db.project_type.findAll()
		                  .then(function(todo){
							  
							      res.json(todo)
							  
							  })
	  
	  }
   
   projectObj.createProject=function(req,res){
	   
	       var proj_info=JSON.parse(req.body.project_info)
		   
		   var developers_array=[]
		   var htmls_array=[]
		   var designers_array=[]
		   var seos_array=[]
		   for(var i=0;i<proj_info.developers.length;i++)
		   {
			   developers_array.push(proj_info.developers[i].id)
		   }
		   for(var i=0;i<proj_info.htmlcoders.length;i++)
		   {
			   htmls_array.push(proj_info.htmlcoders[i].id)
		   }
		   for(var i=0;i<proj_info.designers.length;i++)
		   {
			   designers_array.push(proj_info.designers[i].id)
		   }
		   for(var i=0;i<proj_info.seos.length;i++)
		   {
			   seos_array.push(proj_info.seos[i].id)
		   }
		   db.project.create(proj_info).then(function(todo){
			   
			       res.json(todo)
				   if(developers_array.length>0)
						   db.user.findAll({where:{id:developers_array}}).then(function(users){
							   
									 todo.setUsers(users)
							   
							   })
							   
				   	if(htmls_array.length>0)
						   db.user.findAll({where:{id:htmls_array}}).then(function(users){
							   
									 todo.setUsers(users)
							   
							   })
					if(designers_array.length>0)
						   db.user.findAll({where:{id:designers_array}}).then(function(users){
							   
									 todo.setUsers(users)
							   
							   })		   
					if(seos_array.length>0)
						   db.user.findAll({where:{id:seos_array}}).then(function(users){
							   
									 todo.setUsers(users)
							          
							   })		   		   
				   
				   
			   })
	   
	   
	   }
 
    projectObj.updateProject=function(req,res){
	   
	       var proj_info=JSON.parse(req.body.project_info)
		   var id=req.body.id
		   var developers_array=[]
		   var htmls_array=[]
		   var designers_array=[]
		   var seos_array=[]
		   
		   for(var i=0;i<proj_info.developers.length;i++)
		   {
			   developers_array.push(proj_info.developers[i].id)
		   }
		   for(var i=0;i<proj_info.htmlcoders.length;i++)
		   {
			   htmls_array.push(proj_info.htmlcoders[i].id)
		   }
		   for(var i=0;i<proj_info.designers.length;i++)
		   {
			   designers_array.push(proj_info.designers[i].id)
		   }
		   for(var i=0;i<proj_info.seos.length;i++)
		   {
			   seos_array.push(proj_info.seos[i].id)
		   }
		   db.project.update(proj_info,{where:{id:id}}).then(function(response){
			 db.project.find().then(function(todo){     
			       
				   if(developers_array.length>0)
						   db.user.findAll({where:{id:developers_array}}).then(function(users){
							   
									 todo.setUsers(users)
							   
							   })
							   
				   	if(htmls_array.length>0)
						   db.user.findAll({where:{id:htmls_array}}).then(function(users){
							   
									 todo.setUsers(users)
							   
							   })
					if(designers_array.length>0)
						   db.user.findAll({where:{id:designers_array}}).then(function(users){
							   
									 todo.setUsers(users)
							   
							   })		   
					if(seos_array.length>0)
						   db.user.findAll({where:{id:seos_array}}).then(function(users){
							   
									 todo.setUsers(users)
							          
							   })
				  }) 			   		   		   
				   
				 res.json(response)  
			   })
	   
	   
	   }
 
   	  
   projectObj.uploadDocument=function(req,res){
	     
	       upload(req, res, function (err) {
				if (err) {
				  // An error occurred when uploading 
				   res.json(err)
				}
			      
				 res.json(filenames_obj)
				 filenames_obj=[]
			  })
		  
	   }
	 projectObj.storeProjectDocName=function(req,res){
		 
		     var filename=req.body.filenmae.split(",")
			 var pro_id=req.body.pro_id
			 var uploaded_by=req.body.uploaded_by
			 var input_array=[]
			 if(filename.length>0 && filename[0]!=""){
			 	
			
			  for(var i in filename){
			  	 input_array.push({file_name:filename[i],project_id:pro_id,upload_by:uploaded_by})
			  }
			 
			 /*db.project_document.destroy({where:{project_id:pro_id},force: true }).then(function(todo){})*/
			 	  
			 	      db.project_document.bulkCreate(input_array).then(function(todo){
				 
							     res.json(1)
							 
							 })
			}
			else{
				res.json(1)
			}
			 
			 
		 
		 }
	  projectObj.storeCommentDocName=function(req,res){
		 
		     var filename=req.body.filenmae.split(",")
			 var comment_id=req.body.pro_id
			 var uploaded_by=req.body.uploaded_by
			 var input_array=[]
			 /*db.comment_document.destroy({where:{comment_id:comment_id},force: true }).then(function(todo){})*/
			 if(filename.length>0 && filename[0]!=""){	
			    for(var i in filename){
			  	 input_array.push({file_name:filename[i],comment_id:comment_id,upload_by:uploaded_by})
			  }
			    db.comment_document.bulkCreate(input_array).then(function(todo){
				 
							     res.json(1)
							 
							 })
			 }
			 else{
			 	 res.json(1)
			 }
			 
			 
		 
		 } 		  	 
	 projectObj.removeFile=function(req,res){ 
	                          var relpath=req.body.relpath
                              var file_name=req.body.file_name
							 if(file_name!='undefined'){
							 	
							  
							  var fullpath=current_dir.substr(0,current_dir.indexOf('server'))
							     fullpath=fullpath+'/public/'+relpath
			                  fs.stat(fullpath, function (err, stats) {
								   //console.log(stats);//here we got all information of file in stats variable
								   db.project_document.destroy({where:{file_name:file_name},force:true}).then(function(todo){})
								   if(stats==undefined || file_name=="")
								       res.json("Done")
								
								   if (err) {
									   return console.error(err);
								   }
								
								   fs.unlink(fullpath,function(err){
										if(err) return console.log(err);
										console.log('file deleted successfully');
										res.json(1)
								   });  
								});
							}else{
								
								db.project_document.destroy({where:{file_name:""},force:true}).then(function(todo){
									
									res.json(1)
									
								})
								
							}
		  }
	
	
	 projectObj.getProjectComment=function(req,res){
    	
    	var project_id=req.query.pro_id
    	
    	db.comment.findAll({where:{project_id:project_id},include:[db.user,db.comment_document],limit:20}).then(function(todo){
    		
    		res.json(todo)
    		
    	})
    	
    }	
		  
    projectObj.addProjectcomment=function(req,res){
    	
    	var comment=JSON.parse(req.body.comment)
    	
    	db.comment.create(comment).then(function(todo){
    		
    		res.json(todo)
    		
    	})
    	
    }		  
		  
  return projectObj 	
	
}