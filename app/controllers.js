huApp.controller('LoginController', ['$scope', function($scope){
    console.log('Login Controller')
    $scope.message = 'Logging in.';
}]);

huApp.controller('LogoutController', ['$scope', function($scope){
    console.log('Logout Controller')
    $scope.message = 'Logging out.';
}]);

huApp.controller('RegisterController', ['$scope', function($scope){
    console.log('Register Controller')
    $scope.message = 'Registering.';
}]);

huApp.controller('AuthenticationController', ['$scope', '$http', '$cookieStore', '$state', function($scope, $http, $cookieStore, $state){
    function logHttpResultToConsole(data, status, headers, config) {
        console.log('post success');
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

                $cookieStore.remove('ss-id'); // Remove the cookie
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