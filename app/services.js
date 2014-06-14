huApp.factory('AuthService', function($http, $state, $cookieStore, huAppConfig, $q) {
    var register;

    var register = function(user){
        var url = huAppConfig.apiBaseUri + '/register'
        console.log('username = ' + user.username);
        console.log('password = ' + user.password);
        $http.post(url, user)
            .success(function (data, status, headers, config) {
                console.log('posting registration was successful');
                $cookieStore.put('currentUser', user.username);
                $cookieStore.put('isAuthorized', true);
                register.success = true;
                console.log('completed registration process');
            })
            .error(function (data, status, headers, config) {
                console.log('start error during registration process');
                register.success = false;
                register.errorMessage = data.ResponseStatus.Message;
                console.log(register.errorMessage);
                console.log('end error during registration process');
            });
    };

    return {
        logout: function(){
            var url = huAppConfig.apiBaseUri + '/auth/logout';
            var deferred = $q.defer();

            $http.post(url, {provider : "logout"}).success(function(data){
                console.log('start successful logout');

                deferred.resolve(data);
                $cookieStore.remove('currentUser');
                $cookieStore.remove('isAuthorized');

                console.log('end successful logout');

            }).error(function(){
                console.log('end error during logout');
                deferred.reject("An error occurred while logging out")
            });
            return deferred.promise;
        },
        login: function (user) {
            user.RememberMe = false;
            var url = huAppConfig.apiBaseUri + '/auth/credentials?format=json';
            var deferred = $q.defer();
            $http.post(url, user).success(function(data){
                deferred.resolve(data);
                $cookieStore.put('currentUser', user.username);
                $cookieStore.put('isAuthorized', true);

                console.log('completed registration process');
            }).error(function(data){
               deferred.reject(data.ResponseStatus.Message)
            });
            return deferred.promise;

        },
        register : function(user){
            register(user);
            return register;
        }
    };

});