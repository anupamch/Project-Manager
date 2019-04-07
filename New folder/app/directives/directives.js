/**
 * Created by Anupam on 9/15/2016.
 */



round_table.directive("userLogout",['loginService','$location',function(loginService,$location){

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


