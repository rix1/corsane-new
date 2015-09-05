'use strict';

angular.module('myApp.feed', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/feed/feed.html',
            controller: 'feedCtrl'
        });
    }])

    .controller('feedCtrl', ['$scope', '$rootScope', 'feedService', function($scope, $rootScope, feedService) {

        if(!$rootScope.user)
            return $rootScope.goTo('/welcome');

        feedService.getFeed().then(function(res) {
            $scope.articles = res;
        }, function(err) {
            console.log('Error  while getting feed');
        });

    }]);
