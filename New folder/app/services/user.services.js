
module.export=function($http,$location,config){

    var service={}

    service.listUser=function(){
        $http({
            method:"POST",
            url:config.apiUrl+"/api/users"

        }).then(function successCallback(response){

            service.users=response
            console.log(service.users)

        })


    }

     return service;

}