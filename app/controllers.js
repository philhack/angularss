huApp.controller('LoginController', ['$scope', function($scope){
    console.log('Login Controller')
    $scope.message = 'Logging in.';
}]);

huApp.controller('ProfileController', ['$scope', function($scope){
    console.log('Profile Controller')
    $scope.message = 'Welcome Authenticated User';
}]);

huApp.controller('404Controller', ['$scope', function($scope){
    console.log('404 Controller')
}]);

huApp.controller('RegisterController', ['$scope', function($scope){
    console.log('Register Controller')
    $scope.message = 'Registering.';
}]);

huApp.controller('AuthenticationController', ['$scope', '$http', '$state', 'huAppConfig', function($scope, $http, $state, huAppConfig){
    function logHttpResultToConsole(data, status, headers, config) {
        console.log('data');
        console.log(data);
        console.log('status');
        console.log(status);
        console.log('headers');
        console.log(headers);
        console.log('config');
        console.log(config);
    }

    $scope.login = function (user){
        $scope.submitted = true;

        if($scope.loginForm.$valid){
            var url = huAppConfig.apiBaseUri + '/auth/credentials?format=json';
            console.log('Authentication Controller')
            user.RememberMe = false;
            $http.post(url, user)
                .success(function(data, status, headers, config){
                    logHttpResultToConsole(data, status, headers, config);
                    alert('Authenticated');
                    $state.transitionTo('profile');
                })
                .error(function(data, status, headers, config){
                    logHttpResultToConsole(data, status, headers, config);
                    alert('Failed to authenticate');
                });
            $scope.message = 'Registering.';
        }
    };

    $scope.logout = function(){
        var url = huAppConfig.apiBaseUri + '/auth/logout';
        $http.post(url, {provider : "logout"})
        .success(function(data, status, headers, config){
            $scope.user = null;
            $state.transitionTo('login'); // Redirect to login state

            logHttpResultToConsole(data, status, headers, config);
            alert('Logged Out');
        })
        .error(function(data, status, headers, config){
            logHttpResultToConsole(data, status, headers, config);
            alert('Error logging out');
        });
    };

    $scope.register = function(user){
        $scope.submitted = true;
        console.log('registrationFormValid = ' + $scope.registrationForm.$valid)

        if($scope.registrationForm.$valid) {
            var url = huAppConfig.apiBaseUri + '/register'
            $http.post(url, user)
                .success(function (data, status, headers, config) {
                    alert('Registered');
                    $state.transitionTo('profile');
                })
                .error(function (data, status, headers, config) {
                    alert('Error attempting to register');
                });
        }
    };
}]);