'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
module.exports= function($scope, $location,loginService,$state) {
    $scope.loginService=loginService

    $scope.loggedin=loginService.auth_data.loggedin
    $scope.auth_data=loginService.auth_data
   // console.log(loginService.auth_data)
    $scope.authModel={email:"",password:""}
	
    if(loginService.isAuthenticated())
    { 

            //$location.url('/dashboard')
			$state.go('dashboard')
    }
	


    $scope.loginprocess = function() {

        loginService.login($scope.authModel.email,$scope.authModel.password)
      //$location.path('/dashboard');

      return false;
    }

  }
