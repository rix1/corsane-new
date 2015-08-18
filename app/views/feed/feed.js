'use strict';

angular.module('myApp.feed', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/feed', {
            templateUrl: 'views/feed/feed.html',
            controller: 'feedCtrl'
        });
    }])

    .controller('feedCtrl', ['$scope', '$window', function($scope) {
        console.log('Andreas Var her');
    }]);
