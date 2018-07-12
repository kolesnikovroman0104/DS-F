angular.module('ds.orders', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: '/views/orders.html',
            controller: 'OrdersCtrl'
        });
    }])

    .controller('OrdersCtrl', ['$scope', '$http', '$location', '$window', 'pagerService', function($scope, $http, $location, $window, pagerService) {



    }]);