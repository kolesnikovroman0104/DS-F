angular.module('ds.forgot', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/forgot', {
            templateUrl: '/views/forgot.html',
            controller: 'ForgotCtrl'
        });
    }])

    .controller('ForgotCtrl', ['$scope', '$http', function($scope, $http) {

    }]);