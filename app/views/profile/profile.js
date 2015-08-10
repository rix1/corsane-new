'use strict';

angular.module('myApp.profile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        })
    }])

    .controller('profileCtrl', ['$scope', function($scope) {

        $scope.resetPw = function () {
            console.log('Reset  ');

            // TODO: Send reset instructions by email.
        };

        $scope.deleteAccount = function () {
            console.log('Delete');
            // TODO: Delete account
        };
    }]);