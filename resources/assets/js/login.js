angular.module('ds.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$http', '$location', '$localStorage', function($scope, $http, $location, $localStorage) {

        $scope.loginData = {};

        $scope.errors = [];

        if ($localStorage.token != null && $localStorage.token) {
            $http.get('/api/user/info')
                .then(function successCallback(response){
                    $localStorage.currentUser = response.data;
                    $location.path('/index');
                }, function errorCallback(response) {

                });
        }

        $scope.login = function() {
            $scope.errors = [];
            $http.post('/api/user/login', $scope.loginData)
            .then(function successCallback(response) {
                $localStorage.token = response.data.access_token;
                $location.path('/index');
            }, function errorCallback(response) {
                for (var error in response.data.errors) {
                    response.data.errors[error].forEach(function(item){
                        $scope.errors.push(item);
                    });
                }
                if (response.status_code == '403') {
                    $scope.errors.push('Неправильный логин или пароль');
                }
            });
        }

    }]);