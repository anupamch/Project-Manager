
module.exports =function($cookies,$http,$location,config,$window){
var service={}
    service.auth_data={}
    service.auth_data.loggedin=false
    service.auth_data.user_info=null
    service.login= function(email,password) {


        $http({
            method: "POST",
            url: config.apiUrl+"/auth",

            data: "email=" + email + "&password=" + password,
            headers:{"Content-Type":"application/x-www-form-urlencoded"}

        }).then(function successCallback(response) {

            if(response.data!=null) {

                tokenInfo=response.data;
                $window.localStorage.token=tokenInfo.token
                service.auth_data.user_info=tokenInfo.userinfo

                service.auth_data.loggedin=true

                $location.url("/dashboard")


            }
            

        }, function errorCallback(response) {

        })
    }
    service.isAuthenticated=function(){


        if ($window.localStorage.token)
        {
            service.auth_data.loggedin=true
            //var authtoken=$window.localStorage.token


            //console.log(btoa(authtoken.split(".")[1]))
            //service.auth_data.user_info=authtoken.split(".")
            return true
        }

    }
    service.me=function(){

        $http({
            method: "GET",
            url: config.apiUrlSecure+"/me"

        }).then(function successCallback(response) {

            service.auth_data.user_info=response
        })


    }
    service.logout=function(){

        $window.localStorage.token=""


    }



    return service;

}