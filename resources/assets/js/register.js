angular.module('ds.registration', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: '/views/registration.html',
            controller: 'RegistrationCtrl'
        });
    }])

    .controller('RegistrationCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

        $scope.registrationData = {};

        $scope.errors = [];

        $scope.success = false;

        if ($localStorage.token != null && $localStorage.token) {
            $http.get('/api/user/info')
                .then(function successCallback(response){
                    $scope.currentUser = response.data;
                    $location.path('/index');
                }, function errorCallback(response) {

                });
        }

        $scope.register = function() {
            $scope.errors = [];
            $http.post('/api/user/register', $scope.registrationData)
                .then(function successCallback(response) {
                    $scope.success = true;
                    $scope.registrationData = {};
                }, function errorCallback(response) {
                    for (var error in response.data.errors) {
                        response.data.errors[error].forEach(function(item){
                            $scope.errors.push(item);
                        });
                    }
                });
        }

    }]);