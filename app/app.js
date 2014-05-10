var app = angular.module('healthunleashed', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
        console.log($routeProvider)
        $routeProvider.
            when('/login', {
                templateUrl: '../partials/tpl-login.html',
                controller: LoginCtrl
            }).
            when('/logout', {
                templateUrl: '../partials/tpl-logout.html',
                controller: LogoutCtrl
            }).
            when('/register', {
                templateUrl: '../partials/tpl-register.html',
                controller: RegisterCtrl}).
            otherwise({
                redirectTo: '/'
            });
    }]);
