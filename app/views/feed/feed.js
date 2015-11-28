'use strict';

angular.module('myApp.feed', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('feed', {
                url: "/feed",
                templateUrl: 'views/feed/feed.html',
                controller: 'feedCtrl',
                data: {
                    login: true,
                    admin: false
                }
            });
    }])

    .controller('feedCtrl', ['$scope', '$state', 'feedService', function($scope, $state, feedService) {

        feedService.getFeed().then(function(res) {
            $scope.articles = res;
        }, function(err) {
            console.log('Error while getting feed');
        });
    }]);
