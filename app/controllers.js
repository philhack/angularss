huApp.controller('ApplicationController', ['$rootScope','$scope', '$cookieStore', function($rootScope, $scope, $cookieStore){

    var curUser = $cookieStore.get('currentUser');
    $rootScope.currentUser = curUser != null ? curUser : '';

    var isAuth = $cookieStore.get('isAuthorized');
    $rootScope.isAuthorized = (isAuth != null || isAuth) ? isAuth : false;
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

huApp.controller('AuthenticationController', ['AuthService','$rootScope','$scope', '$http', '$state', '$cookieStore', 'huAppConfig',
                                                function(AuthService, $rootScope, $scope, $http, $state, $cookieStore, huAppConfig){


    $scope.login = function (user){
        user.RememberMe = false;
        if($scope.loginForm.$valid){
            AuthService.login(user).then(function(data){
                    $state.transitionTo('profile');
                    $rootScope.currentUser = data.UserName;
                    $rootScope.isAuthorized = true;
            },
            function(errorMessage){
               console.log('error logging in 1');
               $scope.errorMessage = errorMessage;
                console.log('error logging in 2');
            });
        }
    };

    $scope.logout = function(){
        AuthService.logout().then(function(data){
            $rootScope.currentUser = null;
            $rootScope.isAuthorized = false;
            $state.transitionTo('login'); // Redirect to login state
            alert('Logged Out');
        },
        function(errorMessage){
            console.log(errorMessage);
            alert('Error logging out');
        });
    };

    $scope.register = function(user){
        $scope.submitted = true;

        if(user.confirmPassword != user.password) {
            $scope.passwordConfirmationFailed = true;   //TODO: Replace with ui-validate or a directive
        } else {
            $scope.passwordConfirmationFailed = false;

            if($scope.registrationForm.$valid) {
                AuthService.register(user).then(function(data){
                    $rootScope.currentUser = user.username;
                    $rootScope.isAuthorized = true;
                    $state.transitionTo('profile');
                },
                function(errorMessage){
                    $scope.errorMessage = errorMessage;
                });
            }
        }
    };
}]);