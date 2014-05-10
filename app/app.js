ng-ngApp('hello'){

};
angular.module('hello', [])
    .controller('HelloCtrl', function($scope){
        $scope.thing = {name : 'World'};
    });