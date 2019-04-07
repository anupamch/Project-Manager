'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # Round Table Created By Anupam Chowdhury
 *
 * Main module of the application.
 */
var angular=require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-smart-table');
require('angular-bootstrap-npm' );
require('angular-messages')
require('angular-bootstrap-datetimepicker')
require('ng-file-upload')
var homeController= require('./controllers/homeController')
var loginController= require('./controllers/loginController')
var userController= require('./controllers/userController')
var projectController= require('./controllers/projectController')

var authenticationProvider = require('./services/authentication.services')
var interceptorProvider= require('./services/interceptor')
var userService= require('./services/user.services')
var projectService= require('./services/project.services')


var round_table=angular

  .module('round_table', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
	'ui.bootstrap',
	'smart-table',
	'ngMessages',
	'ui.bootstrap.datetimepicker',
	'ngFileUpload'
])


round_table.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider',function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {

    
    //$urlRouterProvider.otherwise('/login');
	$urlRouterProvider.otherwise(function($injector, $location){
		   var state = $injector.get('$state');
		   
		   if($location.path()!="/")
		   {
		      state.go('404');
		   }
		   else
		     state.go('login');
		   return $location.path();
		});
   
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    

    $httpProvider.interceptors.push('authInterceptor');


    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/common/base.html'
      })
	  .state('authbase', {
        abstract: true,
        url: '',
        templateUrl: 'views/common/auth_base.html'
      })
      .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/home/login.html',
          controller: 'loginCrtl'
        })

      .state('dashboard', {
            url: '/dashboard',
            parent: 'authbase',
            templateUrl: 'views/home/dashboard.html',
            controller: 'homeCrtl',
            authenticate: true
        })
      
		.state('project', {
            url: '/projects',
            parent: 'authbase',
			controller: 'projectCrtl',
            templateUrl: 'views/project/list_project.html',
            authenticate: true,
            
          })
		  
		 .state('addproject', {
            url: '/project/add',
            parent: 'authbase',
			controller: 'projectCrtl',
            templateUrl: 'views/project/add_project.html',
            authenticate: true,
            
          }) 
         .state('editproject', {
            url: '/project/edit/:id',
            parent: 'authbase',
			controller: 'projectCrtl',
            templateUrl: 'views/project/edit_project.html',
            authenticate: true,
            resolve:{
				user_type:['projectService',function(projectService){
					projectService.getProjectType()
					
					
				}]
				
				
			} 
            
          }) 
        .state('viewproject', {
            url: '/project/view/:id',
            parent: 'authbase',
			controller: 'projectCrtl',
            templateUrl: 'views/project/view_project.html',
            authenticate: true,
            
          })      
      .state('users', {
            url: '/users',
            parent: 'authbase',
            templateUrl: 'views/user/user.html',
            authenticate: true,
            redirectTo:"listuser"
          })
      .state('adduser', {
            url: '/user/add',
            parent: 'authbase',
			controller: 'userCrtl',
            templateUrl: 'views/user/add_user.html',
            authenticate: true
          })
	   .state('edituser', {
            url: '/user/edit/:id',
            parent: 'authbase',
			controller: 'userCrtl',
            templateUrl: 'views/user/edit_user.html',
            authenticate: true
          })	  
      .state('listuser', {
            url: '/list',
            parent: 'authbase',
            templateUrl: 'views/user/list_user.html',
            controller:"userCrtl",
            authenticate: true
        })
		.state('404', {
            url: '/404',
            parent: 'base',
            templateUrl: 'views/common/404.html',
            controller:"userCrtl",
            authenticate: true
        })
	  $locationProvider.html5Mode(true)



  }])
     .run(['$rootScope','$location','$cookies','$http','loginService','$state','$transitions',function($rootScope,$location,$cookies,$http,loginService,$state,$transitions){

         
           $transitions.onBefore( { to: '**' }, function(trans,event) {
           	console.log(event)
			              if(trans.to().authenticate)
						  {
						  	   
							   if(!loginService.isAuthenticated())
							   {
								   $state.go("login")
							   }
							   else
							   {
							   	 
								    loginService.me().then(function successCallback(response) {
                                                        
											            loginService.auth_data.user_info=response.data
											             
											            
											        })
								   			        

							   }
						  }
						  
						});			


    }])
    .constant("config", {
        appName: "Round table",
        appVersion: 1.0,
        apiUrlSecure: "http://"+window.location.hostname+":5000/api",
        apiUrl: "http://"+window.location.hostname+":5000", 
        hastag:"#",
		ADMIN:1,
		PM:6,
		CLIENT:7,
		DEVELOPER:2,
		HTMLCODER:3,
		DESIGNER:4,
		SEO:5

    });
	
round_table.controller('homeCrtl',['$scope', '$state',homeController]);
round_table.controller('loginCrtl',['$scope', '$location','loginService','$state',loginController]);
round_table.controller('userCrtl',['$scope','$state','loginService','userService','projectService','$stateParams','$timeout',userController]);
round_table.controller('projectCrtl',['$scope','$state','userService','projectService','loginService','config','Upload','$stateParams','$window','$timeout',projectController]);
	
round_table.service('loginService',authenticationProvider);
round_table.service('userService', userService);
round_table.factory('authInterceptor', interceptorProvider);
round_table.factory('projectService', projectService);


require('./directives/directives.js');
require('./filter/filters.js');