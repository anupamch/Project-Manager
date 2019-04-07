
module.exports =function($cookies,$http,$location,config,$window){
var service={}
    service.auth_data={}
    service.auth_data.loggedin=false
    service.auth_data.user_info=null
    service.login= function(email,password) {
    service.message="" 

        $http({
            method: "POST",
            url: config.apiUrl+"/auth",

            data: "email=" + email + "&password=" + password,
            headers:{"Content-Type":"application/x-www-form-urlencoded"}

        }).then(function successCallback(response) {

            if(response.data!=null && response.data.success) {

                tokenInfo=response.data;
                $window.localStorage.token=tokenInfo.token
                
                service.auth_data.user_info=tokenInfo.userinfo

                service.auth_data.loggedin=true

                $location.url("/dashboard")
             }
			 else
			 {
				 
				 service.message=response.data.message
			 }
            

        }, function errorCallback(response) {

        })
    }
    service.isAuthenticated=function(){
        
        
		
        if ($window.localStorage.token!=undefined && $window.localStorage.token!=="")
        {
			 
            service.auth_data.loggedin=true
            //var authtoken=$window.localStorage.token
              

            //console.log(btoa(authtoken.split(".")[1]))
            //service.auth_data.user_info=authtoken.split(".")
            return true   
        }
		else
		{
			return false   
		}
		

    }
    service.me=function(){

       return $http({
            method: "GET",
            url: config.apiUrlSecure+"/me"

        })

    }
    service.logout=function(){

         $window.localStorage.removeItem('token')
        
        
         service.auth_data.loggedin=false
	 }
	 
	 



    return service;

}