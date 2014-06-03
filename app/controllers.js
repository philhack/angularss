huApp.controller('ApplicationController', ['$rootScope','$scope', function($rootScope, $scope){
    $rootScope.currentUser = null;
    $rootScope.isAuthorized = false;
}]);

huApp.controller('LoginController', ['$scope', function($scope){
}]);

huApp.controller('ProfileController', ['$scope', function($scope){
    console.log('Profile Controller')
}]);

huApp.controller('404Controller', ['$scope', function($scope){
}]);

huApp.controller('RegisterController', ['$scope', function($scope){
}]);

huApp.controller('AuthenticationController', ['$rootScope','$scope', '$http', '$state', '$cookieStore', 'huAppConfig',
                                                function($rootScope, $scope, $http, $state, $cookieStore, huAppConfig){
    $scope.login = function (user){
        $scope.submitted = true;

        if($scope.loginForm.$valid){
            var url = huAppConfig.apiBaseUri + '/auth/credentials?format=json';
            user.RememberMe = false;
            $http.post(url, user)
                .success(function(data, status, headers, config){
                    //$cookieStore.put('currentUser', user.username);
                    $rootScope.currentUser = user.username;
                    $rootScope.isAuthorized = true;
                    $state.transitionTo('profile');
                })
                .error(function(data, status, headers, config){
                    $scope.errorMessage = data.ResponseStatus.Message;
                });
        }
    };

    $scope.logout = function(){
        var url = huAppConfig.apiBaseUri + '/auth/logout';
        $http.post(url, {provider : "logout"})
        .success(function(data, status, headers, config){
            //$scope.user = null;
            //$cookieStore.remove('currentUser');
                $rootScope.currentUser = null;
                $rootScope.isAuthorized = false;
            $state.transitionTo('login'); // Redirect to login state
            alert('Logged Out');
        })
        .error(function(data, status, headers, config){
            alert('Error logging out');
        });
    };

    $scope.register = function(user){
        $scope.submitted = true;
        console.log('registrationFormValid = ' + $scope.registrationForm.$valid)

        if(user.confirmPassword != user.password) {
            $scope.passwordConfirmationFailed = true;   //TODO: Replace with ui-validate or a directive
        } else {
            $scope.passwordConfirmationFailed = false;

            if($scope.registrationForm.$valid) {
                var url = huAppConfig.apiBaseUri + '/register'
                $http.post(url, user)
                    .success(function (data, status, headers, config) {
                        //$cookieStore.put('currentUser', user.username);
                        $rootScope.currentUser = user.username;
                        $rootScope.isAuthorized = true;
                        $state.transitionTo('profile');
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = data.ResponseStatus.Message;
                    });
            }
        }
    };
}]);