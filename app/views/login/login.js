'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl'
        })
            .when('/register', {
                templateUrl: 'views/login/login.html',
                controller: 'authCtrl'
            })
    }])

    .controller('authCtrl', [function () {

    }]);