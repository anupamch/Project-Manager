module.exports=function($scope, $state,userService) {
    $scope.userService=userService
    $scope.userService.listUser()
	}