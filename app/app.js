var huApp = angular.module('huApp', ['ngRoute']);

huApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log($routeProvider)
    $routeProvider.
        when('/login', {
            templateUrl: '../partials/tpl-login.html',
            controller: 'LoginController'
        }).
        when('/logout', {
            templateUrl: '../partials/tpl-logout.html',
            controller: 'LogoutController'
        }).
        when('/register', {
            templateUrl: '../partials/tpl-register.html',
            controller: 'RegisterController' }).
        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);