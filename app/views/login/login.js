'use strict';

angular.module('myApp.login', ['ngRoute'])

    /* SIGN IN */

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login/login.html',
                controller: 'authCtrl'
            })
            .when('/register', {
                templateUrl: 'views/login/login.html',
                controller: 'authCtrl'
            })
    }])

    .controller('authCtrl', ['$scope', function($scope) {
        // something
    }])


    /* LOG OUT */

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'logoutCtrl',
            template: ''
        })
    }])

    .controller('logoutCtrl', ['$rootScope', '$scope', '$location', 'authService', function($rootScope, $scope, $location, authService) {
        authService.logout()
            .then(function (res) {
                delete $rootScope.user;
                $location.path('/landing');
            }, function (err) {
                console.log(err);
            });
    }]);