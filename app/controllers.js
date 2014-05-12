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

huApp.controller('AuthenticationController', ['$scope', '$http', '$state', function($scope, $http, $state){
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
        console.log('Authentication Controller')
        user.RememberMe = false;
        $http.post('http://localhost/api/auth/credentials?format=json', user)
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
    };

    $scope.logout = function(){
        $http.post('http://localhost/api/auth/logout', {provider : "logout"})
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
}]);