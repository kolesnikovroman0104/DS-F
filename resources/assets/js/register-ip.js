angular.module('ds.registerIp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register-ip/:id?', {
            templateUrl: '/views/register-ip.html',
            controller: 'RegisterIpCtrl'
        });
    }])

    .controller('RegisterIpCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

        $scope.formData = {};

        $scope.formData.individuals = [];

        $scope.formData.tax_type = 1;

        $scope.formData.prVisBum = 1;

        $scope.formData.individuals[0] = {};

        $scope.formData.individuals[0].address = {};

        $scope.formData.individuals[0].gender = 1;

        $scope.formData.individuals[0].citizenship = 1;

        $scope.tabsServiceObject = {};

        $scope.tabsServiceObject.tabs = [];

        $scope.tabsServiceObject.totalCount = 8;

        $scope.orderProcessing = false;

        for (var i = 0; i < $scope.tabsServiceObject.totalCount; i++) {
            $scope.tabsServiceObject.tabs[i] = {};
            $scope.tabsServiceObject.tabs[i].active = false;
            $scope.tabsServiceObject.tabs[i].available = true;
        }

        $scope.tabsServiceObject.currentStep = 1;

        $scope.tabsServiceObject.tabs[0].active = true;

        if ($routeParams.id) {
            $scope.orderProcessing = true;
            $http.get('/api/orders/get/' + $routeParams.id)
                .then(function successCallback(response){
                    $scope.formData = response.data.json;
                    $scope.orderProcessing = false;
                }, function errorCallback(response) {
                    $scope.orderProcessing = false;
                });
        }

        $scope.$watch('tabsServiceObject.tabs', function(newValue, oldValue) {
            var totalAvailableCount = 0;

            for (var i = 0; i < newValue.length; i++) {
                if (newValue[i].available) {
                    totalAvailableCount++;
                }
            }

            $scope.tabsServiceObject.totalAvailableCount = totalAvailableCount;
        });

        $scope.nextTab = function() {
            for (var i = 0; i < $scope.tabsServiceObject.tabs.length; i++) {
                if ($scope.tabsServiceObject.tabs[i].active) {
                    $scope.tabsServiceObject.tabs[i].active = false;
                    for (var j = i + 1; j < $scope.tabsServiceObject.tabs.length; j++) {
                        if ($scope.tabsServiceObject.tabs[j].available) {
                            $scope.tabsServiceObject.tabs[j].active = true;
                            $scope.tabsServiceObject.currentStep = j + 1;
                            break;
                        }
                    }
                    break;
                }
            }
            $scope.updateOrder();
            console.log($scope.formData);
        }

        $scope.prevTab = function() {
            for (var i = $scope.tabsServiceObject.tabs.length - 1; i >= 0; i--) {
                if ($scope.tabsServiceObject.tabs[i].active) {
                    $scope.tabsServiceObject.tabs[i].active = false;
                    for (var j = i - 1; j>= 0; j--) {
                        if ($scope.tabsServiceObject.tabs[j].available) {
                            $scope.tabsServiceObject.tabs[j].active = true;
                            $scope.tabsServiceObject.currentStep = j + 1;
                            break;
                        }
                    }
                    break;
                }
            }
        }



        $scope.sendOrder = function() {

        }

        $scope.updateOrder = function() {
            while ($scope.orderProcessing){};
            if (!$scope.formData.order_id) {
                $scope.orderProcessing = true;
                $http.post('/api/orders/add-one', {
                    json: $scope.formData,
                    request_type_id: 1
                })
                    .then(function successCallback(response){
                        $scope.formData.order_id = response.data.id;
                        $scope.orderProcessing = false;
                    }, function errorCallback(response) {
                        $scope.orderProcessing = false;
                    });
            } else {
                $scope.orderProcessing = true;
                $http.post('/api/orders/update', {
                    json: $scope.formData,
                    request_type_id: 1
                })
                    .then(function successCallback(response){
                        $scope.formData.order_id = response.data.id;
                        $scope.orderProcessing = false;
                    }, function errorCallback(response) {
                        $scope.orderProcessing = false;
                    });
            }
        }

    }]);