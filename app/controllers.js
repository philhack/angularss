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
    var result = $http.post('http://localhost/api/auth/credentials', user);
    console.log(result)
    $scope.message = 'Registering.';
}]);