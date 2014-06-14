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
        $scope.submitted = true;
        if($scope.loginForm.$valid){
            var result = AuthService.login(user);
            console.log('login result ' + result.success);
            if(result.success){
                console.log('successful login');
                $state.transitionTo('profile');
                $rootScope.currentUser = result.currentUser;
                $rootScope.isAuthorized = result.isAuthorized;
            } else {
                console.log('error logging in');
                $scope.errorMessage = result.errorMessage;
            }
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
        console.log('registrationFormValid = ' + $scope.registrationForm.$valid)

        if(user.confirmPassword != user.password) {
            $scope.passwordConfirmationFailed = true;   //TODO: Replace with ui-validate or a directive
        } else {
            $scope.passwordConfirmationFailed = false;

            if($scope.registrationForm.$valid) {
                var result = AuthService.register(user);
                console.log('start register from controller. Result.Success =' + result.success);
                if(result.success) {
                    $rootScope.currentUser = user.username;
                    $rootScope.isAuthorized = true;
                    $state.transitionTo('profile');
                } else {
                    $scope.errorMessage = result.errorMessage;
                }
            }
        }
    };
}]);