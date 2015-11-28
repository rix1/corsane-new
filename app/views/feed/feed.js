'use strict';

angular.module('myApp.feed', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('feed', {
                url: "/feed",
                templateUrl: 'views/feed/feed.html',
                controller: 'feedCtrl'
            });
    }])

    .controller('feedCtrl', ['$scope', '$state', '$rootScope', 'feedService', function($scope, $state, $rootScope, feedService) {

        if(!$rootScope.user)
            $state.go('welcome');

        feedService.getFeed().then(function(res) {
            $scope.articles = res;
        }, function(err) {
            console.log('Error while getting feed');
        });

    }]);
