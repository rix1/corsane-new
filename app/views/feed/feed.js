'use strict';

angular.module('myApp.feed', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/feed', {
            templateUrl: 'views/feed/feed.html',
            controller: 'feedCtrl'
        });
    }])

    .controller('feedCtrl', ['$scope', '$location', 'feedService', function($scope, $location, feedService) {
        feedService.getFeed().then(function(res) {
            $scope.articles = res;
            console.log(res);
        }, function(err) {
            console.log('Error  while getting feed');
        });

        $scope.getArticle = function(articleId){
            console.log(articleId);
            $location.path('/article/'+ articleId);
        }
    }]);
