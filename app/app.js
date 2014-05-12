var huApp = angular.module('huApp', ['ngRoute', 'ngCookies', 'ui.router']);

huApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
                function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "partials/tpl-login.html",
            controller: "AuthenticationController"
        })
        .state('register', {
            url:"/register",
            templateUrl: "partials/tpl-register.html",
            controller: "AuthenticationController"
        })
        .state('profile', {
            url:"/profile",
            templateUrl: "partials/tpl-profile.html",
            controller: "ProfileController"
        })
    $locationProvider.html5Mode(true);

    // Interceptor from: https://github.com/fnakstad/angular-client-side-auth
    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
}]);
