'use strict';

angular.module('myApp.profile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        })
    }])

    .controller('profileCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
        // something

        $scope.user = $rootScope.user;

        // TODO: Write cookie

        $scope.logout = function () {
            $location.path("/logout");
        };

    }]);