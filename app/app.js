var huApp = angular.module('huApp', ['ngRoute', 'ngCookies', 'ui.router']);

huApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
                function($stateProvider, $urlRouterProvider, $locationProvider) {
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
    $locationProvider.html5Mode(true);

}]);
