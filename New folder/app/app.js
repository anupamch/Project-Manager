'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
var angular=require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-smart-table-improved');
require( 'angular-bootstrap-npm' );
var homeController= require('./controllers/homeController')
var loginController= require('./controllers/loginController')
var userController= require('./controllers/userController')

var authenticationProvider = require('./services/authentication.services')
var interceptorProvider= require('./services/interceptor')
var userService= require('./services/interceptor')



var round_table=angular
  .module('round_table', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
	'ui.bootstrap'
  ])
round_table.controller('homeCrtl',['$scope', '$state',homeController]);
round_table.controller('loginCrtl',['$scope', '$location','loginService',loginController]);
round_table.controller('userCrtl',['$scope','$state','userService',userController]);

round_table.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider',function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    //$locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('authInterceptor');


    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
      .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/home/login.html',
          controller: 'loginCrtl'
        })

      .state('dashboard', {
            url: '/dashboard',
            parent: 'base',
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'homeCrtl',
            authenticate: true
        })
      .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html',
            controller: 'homeCrtl',
            authenticate: true
        })
      .state('users', {
            url: '/users',
            parent: 'base',
            templateUrl: 'views/user/user.html',
            authenticate: true,
            redirectTo:"listuser"
          })
      .state('adduser', {
            url: '/add',
            parent: 'users',
            templateUrl: 'views/dashboard/adduser.html',
            authenticate: true
          })
      .state('listuser', {
            url: '/list',
            parent: 'users',
            templateUrl: 'views/user/list_user.html',
            controller:"userCrtl",
            authenticate: true
        });



  }])
     .run(['$rootScope','$location','$cookies','$http','loginService','$state',function($rootScope,$location,$cookies,$http,loginService,$state){


        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

            if (toState.authenticate && !loginService.isAuthenticated()){
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
            else
            {
                loginService.me()
            }

            if (toState.redirectTo) {
                event.preventDefault();
                $state.go(toState.redirectTo, toParams)
            }

        });

    }])
    .constant("config", {
        appName: "Round table",
        appVersion: 1.0,
        apiUrlSecure: "http://localhost:5000/api",
        apiUrl: "http://localhost:5000",
        hastag:"#"

    });
round_table.service('loginService',authenticationProvider);
round_table.factory('authInterceptor', interceptorProvider);
round_table.service('userService', userService);
