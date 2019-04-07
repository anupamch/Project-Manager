/**
 * Created by Anupam on 9/15/2016.
 */

var a=angular.module('round_table')
a.directive("userLogout",['loginService','$location',function(loginService,$location){

    return {
        restrict: "A",
        link: function ($scope, element, attrs) {
            element.on("click",function(){

                loginService.logout()
                $location.url("/login")
                $scope.$apply()
            })

        }
    }

}])
a.directive("pageClass",['loginService','$location','$state',function(loginService,$location,$state){

    return {
        restrict: "A",
        link: function ($scope, element, attrs) {
			  
              if($location.url()!="/login")
			    element.addClass("nav-md")
			  else 
                element.addClass("login")  
        }
    }

}])
a.directive("toggleMenu",['loginService','$location','$state','$compile',function(loginService,$location,$state,$compile){

    return {
        restrict: "A",
        link: function ($scope, element, attrs) {
			var elm=element.parent()
			$scope.hidden=true
			
			element.bind("click",function($event){
				if(elm.find("ul").hasClass('ng-hide'))
				   elm.find("ul").removeClass('ng-hide')
				 else
				   elm.find("ul").addClass('ng-hide')   
				/*if(elm.find("ul").attr('ng-hide')=="true")
				{
					//alert(elm.find("ul").attr('ng-hide'))
				   elm.find("ul").attr('ng-hide','false')
				   $compile(elm)($scope)
				   
				   $scope.$apply()
				   $event.preventDefault();
				   $event.stopPropagation()
				}
				else
				{
					//alert(elm.find("ul").attr('ng-hide')) 
				    elm.find("ul").attr('ng-hide','true')
					
					
					//$compile(elm)($scope)
				    $scope.$apply()
					$event.preventDefault();
					$event.stopPropagation()
				}*/
				
				
				   
				})
				 
             //element.children('li').click(function(){alert("asdasd")})
        }
    }

}])
a.directive('ngUnique', ['$http','userService','config', function ($http,userService,config) {
	
	   return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
		  elem.on('blur', function (evt) {
		         scope.$apply(function(){
					 
					 
					           userService.getUserByEmail(elem.val(),ctrl)
					 
					 
					 })
		  })
		}
	  }
	
	}])

a.directive('bootstrapDatepicker', ['config', function (config) {
	
	return {
			   restrict: "A", 
			   link: function (scope, elem, attrs) {
		             //alert("asd")
		              elem.daterangepicker({
						      singleDatePicker: true,
							  calender_style: "picker_4",
							   
						  });
		  
		        
		        }
	  }
	
	}])
a.directive('monthSelect', ['config','$compile', function (config,$compile) {
	
	return {
			   restrict: "A", 
			   link: function (scope, elem, attrs) {
		            
		               var monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
                      str=""
					  
                      for(var i=1;i<=12;i++)
					  {
						  selected=""
						  if(i==1)
						     selected="selected"
						  j="0"+i
						  str+="<option value='"+j+"' "+selected+">"+monthNames[i-1]+"</option>"
					  }
                      elem.html($compile(str)(scope))
					  

		  
		        
		        }
	  }
	
	}])	
	
a.directive("imageResize", [
  "$parse", function($parse) {
    return {
      link: function(scope, elm, attrs) {
      	
        var imagePercent;
        imagePercent = $parse(attrs.imagePercent)(scope);
       
        
       
        	
        	 elm.bind("load", function(e) {
         
		          elm.unbind("load"); //Hack to ensure load is called only once
		          var canvas, ctx, neededHeight, neededWidth;
		          neededHeight = elm[0].naturalHeight * imagePercent / 100;
		          neededWidth = elm[0].naturalWidth * imagePercent / 100;
		          canvas = document.createElement("canvas");
		          canvas.width = neededWidth;
		          canvas.height = neededHeight;
		          ctx = canvas.getContext("2d");
		          ctx.drawImage(elm[0], 0, 0, neededWidth, neededHeight);
		          elm.attr('src', canvas.toDataURL("image/jpeg"));
		        });
        	
        
        
      }
    };
  }
]); 
a.directive('profileInfo', ['config','$compile','loginService', function (config,$compile,loginService) {
	
	   return {
        restrict: "A",
        scope:true,
        link: function ($scope, element, attrs) {
        	$scope.loginService=loginService
        	$scope.image_src="uploads/user.jpg"
        	$scope.$watch('loginService.auth_data.user_info',function(){
        		
        		if(loginService.auth_data.user_info!=null)
        		{
        			 $("#user_name").html(loginService.auth_data.user_info.fname)
        			if(loginService.auth_data.user_info.prof_image!="")
        			{
        				
					   $("#user_img").prop('src',"uploads/"+loginService.auth_data.user_info.prof_image)
					  
					}
				    else{
					   
					   $("#user_img").prop('src',"uploads/user.jpg")
					}
				       
				}
        	})
			  
             
        }
    }
	
}])
a.directive('validateView', ['config','$compile','loginService', function (config,$compile,loginService) {
	return {
        restrict: "A",
       
        link: function ($scope, element, attrs) {
        	 if(attrs.validateView=="")
        	   return
        	 var valid_type=attrs.validateView.split(",")
        	
        	if(loginService.auth_data.user_info!=null)
		       {
		       	  // console.log(valid_type)
		       	    if(valid_type.indexOf(""+loginService.auth_data.user_info.user_type_id)==-1){
						
						
						element.hide()
						
					}
		       	  
		       }
        	
        	
        }
    }
	   
	   
	
	
	
}])

	





