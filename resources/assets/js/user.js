angular.module('ds.user', [])

    .controller('UserBarCtrl', ['$scope', '$http', '$location', '$localStorage', function($scope, $http, $location, $localStorage) {

        $scope.currentUser = {};

        $http.get('/api/user/info')
            .then(function successCallback(response){
                $localStorage.currentUser = response.data.data;
                $scope.currentUser = $localStorage.currentUser;
            }, function errorCallback(response) {

            });

        $scope.logout = function () {
            delete $localStorage.token;
            delete $localStorage.currentUser;
            $location.path('/login');
        }

    }]);