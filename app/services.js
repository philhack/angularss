huApp.factory('AuthService', function($http, $state, $cookieStore, huAppConfig) {
    var authResult;
    var logout;
    var authResult = function (user) {
        var url = huAppConfig.apiBaseUri + '/auth/credentials?format=json';
        user.RememberMe = false;
        $http.post(url, user)
            .success(function(data, status, headers, config){
                $cookieStore.put('currentUser', user.username);
                authResult.currentUser = user.username;
                $cookieStore.put('isAuthorized', true);
                authResult.isAuthorized = true;
                authResult.success = true;
            })
            .error(function(data, status, headers, config){
                authResult.success = false;
                authResult.isAuthorized = false;
                authResult.currentUser = null;
                authResult.errorMessage = data.ResponseStatus.Message;
            });
        console.log(authResult.success);
        console.log(authResult.isAuthorized);
        };

    var logout = function (){
        var url = huAppConfig.apiBaseUri + '/auth/logout';
        $http.post(url, {provider : "logout"})
            .success(function(data, status, headers, config){
                $cookieStore.remove('currentUser');
                $cookieStore.remove('isAuthorized');
                logout.success = true;
            })
            .error(function(data, status, headers, config){
                logout.success = false;
                logout.errorMessage = data.ResponseStatus.Message;
            });
    };

    return {
        login: function (user) {
            authResult(user);
            return authResult;
        },
        logout: function(){
            logout();
            return logout;
        }
    };
});