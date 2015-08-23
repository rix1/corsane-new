'use strict';

angular.module('myApp.logout', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'logoutCtrl',
            template: ''
        })
    }])

    .controller('logoutCtrl', ['$rootScope', '$scope', '$location', 'authService',
        function($rootScope, $scope, $location, authService) {

            authService.logout()
                .then(function (res) {
                    delete $rootScope.user;
                    $location.path('/landing');
                }, function (err) {
                    console.log(err);
                });
        }]);