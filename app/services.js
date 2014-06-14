huApp.factory('AuthService', function($http, $state, $cookieStore, huAppConfig, $q) {
    return {
        logout: function(){
            var url = huAppConfig.apiBaseUri + '/auth/logout';
            var deferred = $q.defer();

            $http.post(url, {provider : "logout"}).success(function(data){
                deferred.resolve(data);
                $cookieStore.remove('currentUser');
                $cookieStore.remove('isAuthorized');
            }).error(function(){
                deferred.reject("An error occurred while logging out")
            });
            return deferred.promise;
        },
        login: function (user) {
            var url = huAppConfig.apiBaseUri + '/auth/credentials?format=json';
            var deferred = $q.defer();
            $http.post(url, user).success(function(data){
                deferred.resolve(data);
                $cookieStore.put('currentUser', user.username);
                $cookieStore.put('isAuthorized', true);
            }).error(function(data){
               deferred.reject(data.ResponseStatus.Message)
            });
            return deferred.promise;
        },
        register : function(user){
            var url = huAppConfig.apiBaseUri + '/register'
            var deferred = $q.defer();
            $http.post(url, user).success(function(data){
                deferred.resolve(data);
                $cookieStore.put('currentUser', user.username);
                $cookieStore.put('isAuthorized', true);

            }).error(function(data){
                deferred.reject(data.ResponseStatus.Message)
            });

            return deferred.promise;
        }
    };
});