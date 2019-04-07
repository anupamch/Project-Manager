module.exports=function($scope, $state,userService,projectService,loginService,config,Upload,$stateParams,$window,$timeout,client_promise,pm_promise) 
{ 
    $scope.userService=userService
	$scope.projectService=projectService
	$scope.loginService=loginService
	$scope.project_info={}
	$scope.clients=""
	$scope.project_man=""
	$scope.developers=""
	$scope.htmlcoders=""
	$scope.designers=""
	$scope.seo=""
	$scope.non_hourly=true
	$scope.state=$state
	$scope.files=""
	$scope.filenames=[]
	$scope.newAttachement=[]
	$scope.dev_names=[]
	$scope.htmlcoder_names=[]
	$scope.designer_names=[]
	$scope.seo_names=[]
	$scope.selected_dev=""
	$scope.selected_html_dev=""
	$scope.selected_designer=""
	$scope.selected_seo=""
	$scope.submit_title="Submit"
	$scope.message={}
	$scope.single_project={}
	$scope.comment_content={}
	$scope.comment_content.comment=""
	$scope.allcommnest=""
	$scope.project_price_show=false
	$scope.config=config
	$scope.newDeveloper=function(type){
		    var temp_arr
			var model_obj
		    if(type=="dev")
			{
		      temp_arr=$scope.dev_names
			  model_obj=$scope.selected_dev
			}
			else if(type=="html")  
			 {    
			    temp_arr=$scope.htmlcoder_names
				model_obj=$scope.selected_html_dev
			 }
			 else if(type=="designer")  
			 {    
			    temp_arr=$scope.designer_names
				model_obj=$scope.selected_designer
			 }
			 else if(type=="seo")  
			 {    
			    temp_arr=$scope.seo_names
				model_obj=$scope.selected_seo
			 }
			    var checkFlag=false
			    for(var i in temp_arr){
				
				   if(temp_arr[i].id==model_obj.id)
				   {
				       checkFlag=true
					   break
				   }
				}
				if(!checkFlag)
			       temp_arr.push({id:model_obj.id,fname:model_obj.fname,lname:model_obj.lname})
				model_obj=""
				freeTempobject()
				if(type=="dev")
				{
				  $scope.dev_names=temp_arr
				 
				}
				else if(type=="html")  
				 {    
					$scope.htmlcoder_names=temp_arr
					
				 }
				 else if(type=="designer")  
				 {    
					$scope.designer_names=temp_arr
					
				 }
				 else if(type=="seo")  
				 {    
					$scope.seo_names=temp_arr
					
			 }
			 }	 
	
	var freeTempobject=function(){
		   $scope.selected_dev=""
			$scope.selected_html_dev=""
			$scope.selected_designer=""
			$scope.selected_seo=""
		
		}
			 	
	$scope.unselectDeveloper=function(id,type){
		   var temp_arr
		   if(type=="dev")
		      temp_arr=$scope.dev_names
			else if(type=="html")  
			     temp_arr=$scope.htmlcoder_names
			else if(type=="designer")  
			     temp_arr=$scope.designer_names
		     else if(type=="seo")  
			     temp_arr=$scope.seo_names		 	 
		    for(var i in temp_arr){
				
				   if(temp_arr[i].id==id)
				       temp_arr.splice(i,1)
				}
			if(type=="dev")
			{
				
		        $scope.dev_names=temp_arr	
			}
			else if(type=="html")  
			     $scope.htmlcoder_names =temp_arr
		    else if(type=="designer")  
			    $scope.designer_names= temp_arr
		     else if(type=="seo")  
			     $scope.seo_names=temp_arr
				
		}		 
	 	 
	if($scope.state.current.name=="project")
	{
		if($scope.loginService.auth_data.user_info!=null)
		$scope.projectService.list_project($scope.loginService.auth_data.user_info.id,$scope.loginService.auth_data.user_info.user_type_id)
		else
		{
			$timeout(function(){
		   	
		   	$scope.projectService.list_project($scope.loginService.auth_data.user_info.id,$scope.loginService.auth_data.user_info.user_type_id)
		   	
		   },1500)
		}
		   
	}
	else
	{
	
		var client_promise=$scope.userService.getUserByType(config.CLIENT)
	    var pm_promise=$scope.userService.getUserByType(config.PM)
		var developer_promise=$scope.userService.getUserByType(config.DEVELOPER)
		var html_promise=$scope.userService.getUserByType(config.HTMLCODER)
		var designer_promise=$scope.userService.getUserByType(config.DESIGNER)
		var seo_promise=$scope.userService.getUserByType(config.SEO)
		client_promise.then(function successCallback(response){
				 $scope.clients=response.data
			})
		pm_promise.then(function successCallback(response){
				 $scope.project_man=response.data
			})
		developer_promise.then(function successCallback(response){
				 $scope.developers=response.data
			})
		html_promise.then(function successCallback(response){
				 $scope.htmlcoders=response.data
			})
		designer_promise.then(function successCallback(response){
				 $scope.designers=response.data
			})
		seo_promise.then(function successCallback(response){
				 $scope.seo=response.data
			})								
		$scope.projectService.getProjectType()
		
		if($scope.loginService.auth_data.user_info!=undefined && $scope.loginService.auth_data.user_info.user_type_id==1)
		{
			$scope.project_price_show=true
		}
		
		var init=function(){
			  
			  $scope.project_info.name=""
			  $scope.project_info.project_type_id=""
			  $scope.project_info.client_id=""
			  $scope.project_info.project_des=""
			  $scope.project_info.start_time=""
			  $scope.project_info.dead_line=""
			  $scope.project_info.pm_id=""
			  $scope.project_info.time=""
			  $scope.project_info.time_unit="day"
			  $scope.project_info.hourly_pay=false,
			  $scope.project_info.created_by=""
			  $scope.project_info.price=0
			  $scope.project_info.created_by =""
			  //$scope.project_info.introduce_by=""
			  $scope.project_info.developers=[]
			  $scope.project_info.htmlcoders=[]
			  $scope.project_info.seos=[]
			  $scope.project_info.designers=[]
			  $scope.project_info.documents=[]
			  $scope.filenames=[]
			  
			}
		init()
		
		var getComents=function(id){
		  	$scope.projectService.getComments(id).then(function(todo){
		  		
		  		
		  		$scope.allcommnest=todo.data
		  		
		  		
		  	})
		  	
		  }	 
		
		
		$scope.hourlyPay=function(){
			  if($scope.project_info.hourly_pay)
			  {
				  $scope.project_info.time=""
			      $scope.project_info.time_unit="day"
			      $scope.non_hourly=false
			  }
			  else
			     $scope.non_hourly=true	  
			
			}
			
		if($scope.state.current.name=="editproject" || $scope.state.current.name=="viewproject")	
		{
			   var id=$stateParams.id
			   
			   $scope.projectService.getSingleProject(id).then(function successCallBack(todo){
			   	      response=todo.data.project
			   	      $scope.single_project=todo.data
			   	      //console.log(todo.data.project)
			   	      $scope.project_info.name=response.name
					  $scope.project_info.project_type_id=response.project_type_id
					  
					  $scope.project_info.project_des=response.project_des
					  $scope.project_info.start_time=""
					  
					  if(response.start_time!="")
					  {
					  	var dt=new Date(response.start_time)
					  	var dd=dt.getDate()/10<1?"0"+dt.getDate():dt.getDate()
					  	var dm=(dt.getMonth()+1)/10<1?"0"+dt.getMonth():dt.getMonth()
					       $scope.project_info.start_time= dm+"/"+dd+"/"+dt.getFullYear()	
					  }
					  
					  $scope.project_info.dead_line=response.dead_line
					  $scope.project_info.pm_id=response.pm_id
					  $scope.project_info.client_id=response.client_id
					  
					 
					  $scope.project_info.project_type_id=response.project_type_id
					  $scope.project_info.price=response.price
					  if(response.dead_line!=""){
					  	  if($scope.project_info.dead_line=="Hourly Pay")
					         $scope.project_info.hourly_pay=true
						  else    
						  {
						  	
						  	 $scope.project_info.time=parseInt(response.dead_line.split(" ")[0])
						     $scope.project_info.time_unit=response.dead_line.split(" ")[1]
						  }
					  }
					  else{
					  	$scope.project_info.time_unit="" 
					  }
					  var as_developer=false
					  for(var i in todo.data.members)
					  {
					  	if(todo.data.members[i].id==$scope.loginService.auth_data.user_info.id)
					  	    as_developer=true
	
					  	if(todo.data.members[i].user_type_id==config.DEVELOPER)
					  	{
					  		
							$scope.dev_names.push(todo.data.members[i])
							$scope.project_info.developers.push(todo.data.members[i])
						}
					  	    
					  	if(todo.data.members[i].user_type_id==config.HTMLCODER)
					  	{
					  		$scope.htmlcoder_names.push(todo.data.members[i])
							$scope.project_info.htmlcoders.push(todo.data.members[i]) 
						}
					  	   
					  	if(todo.data.members[i].user_type_id==config.SEO)
					  	{
					  		$scope.seo_names.push(todo.data.members[i])
							$scope.project_info.seos.push(todo.data.members[i])
						}
					  	
					  	if(todo.data.members[i].user_type_id==config.DESIGNER)
					  	{
					  		$scope.designer_names.push(todo.data.members[i])
							$scope.project_info.designers.push(todo.data.members[i]) 
						}
					  	                 
					  } 
					 if(todo.data.project.project_documents.length>0)
					  {
					  	//$scope.filenames.push(todo.data.project.project_documents[0].file_name) 
					  	for(var i in todo.data.project.project_documents)
					  	{
							$scope.filenames.push(todo.data.project.project_documents[i].file_name)
							//$scope.projectService.project_docs.push(todo.data.project.project_documents[i].file_name)
						}
					  	
					  	
					  }
					  
					  /*********Get Respective Comment************/
					  if($scope.state.current.name=="viewproject" && as_developer)
					  {
					   	  getComents(id) 
					   }
					  
					
			   })
			
		}
			
			
		 
		 $scope.createProject=function(form){
			 		 
			
			     if(form.$valid){ 
					  $scope.project_info.start_time=document.getElementById('start_date').value
					  
					  if($scope.project_info.hourly_pay)
					  {
			             $scope.project_info.dead_line="Hourly Pay"
					  }
					  else
					  {
						  if($scope.project_info.time!="" && $scope.project_info.time!=null)
					        $scope.project_info.dead_line=$scope.project_info.time+" "+$scope.project_info.time_unit 	 
					  }
					  $scope.project_info.created_by=$scope.loginService.auth_data.user_info.id	
					  $scope.project_info.developers=$scope.dev_names
					  $scope.project_info.htmlcoders=$scope.htmlcoder_names 
					  $scope.project_info.designers=$scope.designer_names
					  $scope.project_info.seos=$scope.seo_names
					  
					  $scope.project_info.created_by=$scope.loginService.auth_data.user_info.id
					  $scope.submit_title="Submitting..."
					  if($scope.loginService.auth_data.user_info.user_type_id==6)
					       $scope.project_info.pm=$scope.loginService.auth_data.user_info.id
					   else if($scope.loginService.auth_data.user_info.user_type_id==7) 
					       $scope.project_info.client=$scope.loginService.auth_data.user_info.id    
			          $scope.projectService.create_project($scope.project_info)
			                               .then(function successCallback(response)
			                               {
					                        //console.log(response.getUser()) 
											if(response.data!="")
											    $scope.projectService.saveDocumentInDb(response.data.id,$scope.loginService.auth_data.user_info.id)
											                         .then(function successCallback(data)
																	    {
																	    	
														                  $scope.submit_title="Submit"   
																	      $scope.message.type="success"
																	      $scope.message.msg="Project Created successfully"
																	      init() 
																		  form.$setUntouched();
													                      form.$setPristine();
														
																        })
					
							})
					  
				  }
                 
			 
			 }
			 
		 $scope.updateProject=function(form){
		 	
			  // $scope.projectService.uploadFiles($scope.files)
			 //console.log(document.getElementById('start_date').value)
			
			     if(form.$valid){ 
					  $scope.project_info.start_time=document.getElementById('start_date').value
					  $scope.project_info.edited_by =$scope.loginService.auth_data.user_info.id
					  $scope.project_info.edit_date =new Date()
					  if($scope.project_info.hourly_pay)
					  {
			             $scope.project_info.dead_line="Hourly Pay"
					  }
					  else
					  {
						  if($scope.project_info.time!="" && $scope.project_info.time!=null)
					        $scope.project_info.dead_line=$scope.project_info.time+" "+$scope.project_info.time_unit 	 
					  }
					  $scope.project_info.created_by=$scope.loginService.auth_data.user_info.id	
					  $scope.project_info.developers=$scope.dev_names
					  $scope.project_info.htmlcoders=$scope.htmlcoder_names 
					  $scope.project_info.designers=$scope.designer_names
					  $scope.project_info.seos=$scope.seo_names
					  
					  //$scope.project_info.created_by=$scope.loginService.auth_data.user_info.id
					  $scope.submit_title="Submitting..."
			          $scope.projectService.update_project($scope.project_info,$stateParams.id)
			                               .then(function successCallback(response)
			                               {
					                        //console.log(response.getUser()) 
											if(response.data!="")
											{
												
												$scope.projectService.saveDocumentInDb($stateParams.id,$scope.loginService.auth_data.user_info.id)
											                         .then(function successCallback(data)
																	    {
																	    	
														                  $scope.submit_title="Submit"   
																	      $scope.message.type="success"
																	      $scope.message.msg="Project Updated successfully"
																	     
																	      
																	      init() 
																		  form.$setUntouched();
													                      form.$setPristine();
													                      $timeout(function(){
													                      	 $state.go("project")
													                      },3000)
													                     
														
																        })
											}
											    
					
							})
					  
				  }
                 
			 
			 }
			 	 
			 	
	     $scope.cancel=function(){
			       
			     $state.go("project")
			 
			 }
		 	
		 $scope.uploadFiles = function (files) {
			    var selected_files=[]
			    
			    if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						if($scope.filenames.indexOf(files[i].name)<0)
						{
					        $scope.filenames.push(files[i].name)
							selected_files[selected_files.length]=files[i]
							
						}
					  
					  
					}
					
					$scope.projectService.uploadFiles(selected_files)
				}
			 }
		 $scope.uploadAttachement = function (files) {
			    var selected_files=[]
			    
			    if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						if($scope.newAttachement.indexOf(files[i].name)<0)
						{
					        $scope.newAttachement.push(files[i].name)
							selected_files[selected_files.length]=files[i]
							
						}
					  
					  
					}
					
					$scope.projectService.uploadFiles(selected_files,$scope.newAttachement)
				}
			 }
			 	 
		 $scope.removeFile=function(i,file_name,len){
			             
			              $scope.projectService.removeFile(i,file_name,len)
						  $scope.filenames.splice(i,1) 
						
			 
			 }
		$scope.removeAttachement=function(i,file_name,len){
			             
			              $scope.projectService.removeFile(i,file_name,len)
						  $scope.newAttachement.splice(i,1) 
						
			 
			 }		 	
		$scope.addComent=function(){
		  	     if($scope.comment_content.comment=="")
				  	{
						alert("Comment cannot be null")
						return
					} 
				  	$scope.comment_content.project_id=$stateParams.id
				  	$scope.comment_content.owner_id=$scope.loginService.auth_data.user_info.id
				  	$scope.projectService.saveComments($scope.comment_content).then(function(todo){
				  		
				  		todo.data.user=$scope.loginService.auth_data.user_info
				  		$scope.allcommnest[$scope.allcommnest.length]=todo.data
				  		$scope.comment_content.comment=""
				  		$scope.projectService.saveDocumentInDb(todo.data.id,$scope.loginService.auth_data.user_info.id,true)
				  		                     .then(function successCallback(data)
												    {
				  		                                $scope.newAttachement=[]                                
				  	                                })    
				  	                          
				  })
		  }
		  
		 	 	 
	 
}
} 