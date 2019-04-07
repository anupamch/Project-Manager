module.exports=function($http,$location,config,Upload){

    var userservice={}
    userservice.users=[]
	userservice.groups=""
	userservice.user_type=""
	
    userservice.listUser=function(id){
		
        $http({
            method:"GET",
            url:config.apiUrl+"/api/users?self_id="+id

        }).then(function successCallback(response){

            userservice.users=response.data
            //console.log(userservice.users)

        })


    }
	userservice.getUserByEmail=function(email,form){
		  $http({
			      method:"POST",
			      url:config.apiUrl+"/api/getUserByEmail",
				  headers:{"Content-Type":"application/x-www-form-urlencoded"},
				  data:"email="+email
				  
			  }).then(function successCallback(response){
				    
				     if(response.data.success===true)
					 { 
					 
				        form.$setValidity("unique",false)
					 }
					 else
					 {
					    form.$setValidity("unique",true) 	
					 }
				  
				  })
		
		}
	userservice.getUserByType=function(id){
		  return $http({
			      method:"GET",
			      url:config.apiUrl+"/api/getUsersByType?type_id="+id
				  
				 
				  
			  })
		}	
	userservice.getGroups=function(){
		
		     $http({
			      method:"GET",
			      url:config.apiUrl+"/api/getGroups",
				 
				 
				  
			  }).then(function successCallback(response){
				     				 
				     userservice.groups=response.data
					 	
				  })
		
		}
	 userservice.getUserType=function(){
		
		     $http({
			      method:"GET",
			      url:config.apiUrl+"/api/getUserType",
				 
				 
				  
			  }).then(function successCallback(response){
				     				 
				     userservice.user_type=response.data
					 	
				  })
		
		}
	userservice.getUserById=function(id){
		
		      return $http({
			      method:"GET",
			      url:config.apiUrl+"/api/getUsersById?id="+id
				
			  })
		}	
	userservice.saveUser=function(user_info){
		
		     return $http({
			      method:"POST",
			      url:config.apiUrl+"/api/saveUser",
				  headers:{"Content-Type":"application/x-www-form-urlencoded"},
				  data:"user_info="+angular.toJson(user_info)
			  })
		}		
     userservice.editUser=function(user_info,id){
		
		     return $http({
			      method:"POST",
			      url:config.apiUrl+"/api/editUser",
				  headers:{"Content-Type":"application/x-www-form-urlencoded"},
				  data:"user_info="+angular.toJson(user_info)+"&id="+id
			  })
		}	
		
		userservice.changeUserPassword=function(user_info,id){
		
		     return $http({
			      method:"POST",
			      url:config.apiUrl+"/api/editUser",
				  headers:{"Content-Type":"application/x-www-form-urlencoded"},
				  data:"user_info="+angular.toJson(user_info)+"&id="+id
			  })
		}
				  
		
		
		
			
     return userservice;

}