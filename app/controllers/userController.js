module.exports=function($scope, $state,loginService,userService,projectService,$stateParams,$timeout) {
	$scope.userinfo={}
    $scope.userService=userService
   
	$scope.userService.getUserType()
	$scope.state=$state
	$scope.loginService=loginService
	$scope.password_error=false
	$scope.password_success=false
	$scope.show_feedback=false
	$scope.files=""
	$scope.filenames=[]
	var user_id=""
	$scope.projectService=projectService
	if($scope.state.current.name=='listuser'){
		
	    
			if($scope.loginService.auth_data.user_info!=undefined && $scope.loginService.auth_data.user_info!=null )
			{
				user_id=$scope.loginService.auth_data.user_info.id
				$scope.userService.listUser(user_id)	
			    
			}
			     
			else
			{
			      $scope.loginService.me().then(function successCallback(response) {

													                $scope.loginService.auth_data.user_info=response.data
				 									                user_id=$scope.loginService.auth_data.user_info.id
				 									                $scope.userService.listUser(user_id)	
				 									             })
				 									            
				
			}
	}
											          
	if($scope.state.current.name=='edituser')
	{
	     var id=$stateParams.id
		 var promise=$scope.userService.getUserById(id)	
		 promise.then(function successCallback(response){
			 if(response.data!=""){
				   response.data=response.data[0]
				   var dob=response.data.dob
				  
				   $scope.edit_user_id=response.data.id
				   $scope.userinfo.id=response.data.id
				   $scope.userinfo.fname=response.data.fname
				   $scope.userinfo.lname=response.data.lname
				   $scope.userinfo.email=response.data.email
				   $scope.userinfo.gender=response.data.gender
				   $scope.userinfo.dob_day=dob.split("-")[2].split("T")[0]
				   $scope.userinfo.dob_month=dob.split("-")[1]
				   $scope.userinfo.dob_year=dob.split("-")[0]
				   $scope.userinfo.address=response.data.address
				   $scope.userinfo.prof_image=response.data.prof_image
				   $scope.userinfo.user_type_id=""+response.data.user_type_id
				   $scope.userinfo.phone_no=response.data.phone_no
				   
				 }
			      
			 })
	}
	$scope.monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
	var init=function(){
		
		   $scope.userinfo.fname=""
		   $scope.userinfo.lname=""
		   $scope.userinfo.email=""
		   $scope.userinfo.password=""
		   $scope.userinfo.gender="male"
		   $scope.userinfo.dob_day="1"
		   $scope.userinfo.dob_month="1"
		   $scope.userinfo.dob_year="1975"
		   $scope.userinfo.address=""
		   $scope.userinfo.group=""
		   $scope.userinfo.user_type_id=""
		   $scope.userinfo.phone_no=""
		    $scope.userinfo.prof_image=""
		   
		}
    init()
	
	
	$scope.saveUser=function(form){
	         $scope.message=""	   
		     if(form.$valid)
			 {
				 $scope.userinfo.created_by=user_id
				 $scope.userinfo.dob_day=$scope.userinfo.dob_day/10==0?"0"+$scope.userinfo.dob_day:$scope.userinfo.dob_day
				 $scope.userinfo.dob_month=$scope.userinfo.dob_month/10==0?"0"+$scope.userinfo.dob_month:$scope.userinfo.dob_month
				 $scope.userinfo.dob=$scope.userinfo.dob_year+"-"+$scope.userinfo.dob_month+"-"+$scope.userinfo.dob_day
				 var promise=$scope.userService.saveUser($scope.userinfo)
				  promise.then(function successCallback(response){
					  if(response.data.id!="")
					  {
						  $scope.message={type:"success",msg:"User Created Successfully."}
						  init()
						  form.$setUntouched();
                          form.$setPristine();
						  $scope.projectService.saveProfileImage($scope.projectService.project_docs,response.data.id)
						                       .then(function successCallback(){
												   
												        $scope.projectService.project_docs=""
												   
												   })
						      
					  }
					  else
					  {
						 $scope.message={type:"danger",msg:"Failed to create user!!"} 
					  }
				 })
			 }
		
		}
	$scope.editUser=function(form){
		
	         $scope.message=""	   
		     if(form.$valid)
			 {
				 $scope.userinfo.dob_day=$scope.userinfo.dob_day/10==0?"0"+$scope.userinfo.dob_day:$scope.userinfo.dob_day
				 $scope.userinfo.dob_month=$scope.userinfo.dob_month/10==0?"0"+$scope.userinfo.dob_month:$scope.userinfo.dob_month
				 $scope.userinfo.dob=$scope.userinfo.dob_year+"-"+$scope.userinfo.dob_month+"-"+$scope.userinfo.dob_day
				 var promise=$scope.userService.editUser($scope.userinfo,$scope.edit_user_id)
				  promise.then(function successCallback(response){
					  if(response.data.id!="")
					  {
						 
						  init()
						  form.$setUntouched();
                          form.$setPristine();
						  $state.go("listuser")    
					  }
					  
				 })
			 }
		
		}	
    $scope.checkDuplicateUser=function(form){
		
		   $scope.userService.getUserByEmail($scope.userinfo.email,form)
				
		} 
		
		 $scope.changePassword=function(){
			 $scope.password_success=false
			 $scope.password_error=false
			 if($scope.userinfo.password!=""){
		   var user_info={password:$scope.userinfo.password}
		          var promise=$scope.userService.changeUserPassword(user_info,$scope.edit_user_id)
				  promise.then(function sucessCallback(response){
					      if(response.data[0]==1)
					         $scope.password_success=true
					  })
			 }
			 else
			 {
				 $scope.password_error=true
			 }
				
		} 
		
		$scope.cancel=function(){
			
			   $state.go('listuser')
			
			}
		$scope.deleteUser=function(id){
			if(confirm("Are you sure to delete this user?")){
			   var user_info={user_status:3}
			   var promise=$scope.userService.editUser(user_info,id)
				  promise.then(function sucessCallback(response){
					      if(response.data[0]==1)
					         {
								$scope.message={type:"success",msg:"User deleted Successfully."} 
								 $scope.userService.listUser()
								 $scope.show_feedback=true
							 }
					  })
			    }
			}	
		
	    $scope.uploadFiles = function (files,newfile) {
			    var selected_files=[]
			    
			    if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						if($scope.filenames.indexOf(files[i].name)<0)
						{
					        $scope.filenames.push(files[i].name)
							selected_files[selected_files.length]=files[i]
							
						}
					  
					  
					}
					if(newfile==undefined)
					   $scope.projectService.uploadProfileFiles(selected_files,$scope.userinfo)
					else
					{
					   $scope.projectService.uploadFiles(selected_files,$scope.userinfo)
					   $timeout(function(){
					   	
					   	    $scope.userinfo.prof_image= $scope.projectService.project_docs[0]
					   	
					   },2000) 
					    	
					}
					
				}
			 }
		 $scope.removeFile=function(i,file_name,len){
			             
			              $scope.projectService.removeFile(i,file_name,len)
						  $scope.filenames.splice(i,1) 
						
			 
			 }	 
				
	
}