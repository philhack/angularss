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

huApp.controller('AuthenticationController', ['$scope', '$http', function($scope, $http){
    console.log('Authentication Controller')
    var user =  {
            UserName : 'philhack',
            Password : 'password1',
            RememberMe : true

    };
    $http.post('http://localhost/api/auth/credentials', user)
        .success(function(data, status, headers, config){
            alert('Authenticated');
            console.log('post success');
            console.log('data');
            console.log(data);
            console.log('status');
            console.log(status);
            console.log('headers');
            console.log(headers);
            console.log('config');
            console.log(config);
        })
        .error(function(data, status, headers, config){
            alert('Failed to authenticate');
            console.log('post fail');
            console.log('data');
            console.log(data);
            console.log('status');
            console.log(status);
            console.log('headers');
            console.log(headers);
            console.log('config');
            console.log(config);
        });
    $scope.message = 'Registering.';
}]);