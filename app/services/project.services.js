module.exports=function($http,$location,config,Upload){
	
	var service={}
	 service.projectType={}
	 service.project_list={}
	 

	 service.getProjectType=function(){
     service.project_docs=[]
     service.comment_docs=[]		 
		    $http({
            method:"GET",
            url:config.apiUrl+"/api/getProjectType"
		
				}).then(function successCallback(response){
		
					service.projectType=response.data
					//console.log(userservice.users)
		
				})
		 
		 
		 }
		service.removeFile=function(i,file_name,len){
			
			        var relpath="uploads/"+file_name          
			        return $http({
									method:"POST",
									data:"relpath="+relpath+"&file_name="+file_name ,
									headers:{"Content-Type":"application/x-www-form-urlencoded"},
									url:config.apiUrl+"/api/removeFile"
								
								}).then(function successCallBack(todo){
										   var old_data_len=len-service.project_docs.length
										   //console.log(old_data_len+" "+i+" "+len+" "+service.project_docs.length)
										        if(old_data_len<=i)
										            service.project_docs.splice(i-old_data_len,1)
											   // console.log(service.project_docs)       
							             
							 })
			} 
		service.list_project=function(id,user_type_id){
			
			
			    $http({
						method:"GET",
						url:config.apiUrl+"/api/getProjects?id="+id+"&user_type_id="+user_type_id
					
							}).then(function successCallback(response){
					
								service.project_list=response.data
								
					
							})
				} 
				
		service.getSingleProject=function(id){
			
			
			    return $http({
						method:"GET",
						url:config.apiUrl+"/api/getSingleProjects?id="+id
					
							})
							
							
				} 
						
		service.create_project=function(project_info){
			    
			      return $http({
						method:"POST",
						url:config.apiUrl+"/api/createProject",
						data:"project_info="+angular.toJson(project_info),
						headers:{"Content-Type":"application/x-www-form-urlencoded"}
					
							})
			
			}	
			
		service.update_project=function(project_info,id){
			    
			      return $http({
						method:"POST",
						url:config.apiUrl+"/api/updateProject",
						data:"project_info="+angular.toJson(project_info)+"&id="+id,
						headers:{"Content-Type":"application/x-www-form-urlencoded"}
					
							})
			
			}			
				
		service.uploadFiles=function(files){
			
			     if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						
					  Upload.upload({
						  url:config.apiUrl+"/api/uploadDocument", 
						  data: {file: files[i]},
						  headers:{"Content-Type":"application/x-www-form-urlencoded"}
						  }).then(function (resp) {
							  if(resp.data.length>0)
							  {
								  	 var name_array=[]
								  	
								  	    name_array=resp.data
								  	
								  	if(service.project_docs!=undefined && service.project_docs.length>0)
								  	{
									  for(var i in name_array)							  
									  	   service.project_docs.push(name_array[i])	
									}
									  	
								  	else   
								       service.project_docs=name_array
								       
								  //console.log(service.project_docs)     
								     
							  }
								
								}, function (resp) {
									//console.log('Error status: ' + resp.status);
								}, function (evt) {
									//var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
									//console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
								});
					}
				 }
			}
	   	service.uploadProfileFiles=function(files,user_info){
			
			     if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						
					  Upload.upload({
						  url:config.apiUrl+"/api/uploadDocument", 
						  data: {file: files[i]},
						   headers:{"Content-Type":"application/x-www-form-urlencoded"}
						  }).then(function (resp) {
							  if(resp.data.length>0)
							  {
								  	 
								       
								   service.saveProfileImage(resp.data,user_info.id).then(function(todo){
								   	    
								   	    user_info.prof_image=todo.data
								   })    
								     
							  }
								
								}, function (resp) {
									//console.log('Error status: ' + resp.status);
								}, function (evt) {
									//var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
									//console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
								});
					}
				 }
			}	  
	   service.saveDocumentInDb=function(pro_id,uploaded_by,is_comment){
	   	           var url=config.apiUrl+"/api/storeProjectDocName" 
	   	           if(is_comment)
	   	              url=config.apiUrl+"/api/storeCommentDocName"
	   	            
		            var file_name=service.project_docs.join(",")
					
					
		            return $http({
						method:"POST",
						url:url,
						data:"filenmae="+file_name+"&pro_id="+pro_id+"&uploaded_by="+uploaded_by,
						headers:{"Content-Type":"application/x-www-form-urlencoded"}
					
							})
		   }
		 service.saveProfileImage=function(prof_img,id){
	   	           
	   	              url=config.apiUrl+"/api/updateProfileImage"
	   	            
		            var file_name=prof_img.join(",")
					
					
		             return $http({
									method:"POST",
									url:url,
									data:"filenmae="+file_name+"&id="+id,
									headers:{"Content-Type":"application/x-www-form-urlencoded"}
					
							    })
		   }   
		service.getComments=function(id){
			
			return $http({
						method:"GET",
						url:config.apiUrl+"/api/getProjectComment?pro_id="+id
					
							})
		} 
		
		service.saveComments=function(comment){
		          
					
		            return $http({
						method:"POST",
						url:config.apiUrl+"/api/addProjectcomment",
						data:"comment="+angular.toJson(comment),
						headers:{"Content-Type":"application/x-www-form-urlencoded"}
					
							})
		   }  				
	
	return service
	
	
	}