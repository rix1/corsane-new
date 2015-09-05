'use strict';

angular.module('myApp.feed', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/feed/feed.html',
            controller: 'feedCtrl'
        });
    }])

    .controller('feedCtrl', ['$scope', 'feedService', function($scope, feedService) {
        feedService.getFeed().then(function(res) {
            $scope.articles = res;
        }, function(err) {
            console.log('Error  while getting feed');
        });

    }]);
