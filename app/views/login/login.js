'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login/login.html',
                controller: 'loginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/login/login.html',
                controller: 'loginCtrl'
            });
    }])

    .controller('loginCtrl', ['$scope', function($scope) {
        console.log('lol');
        // something
    }]);