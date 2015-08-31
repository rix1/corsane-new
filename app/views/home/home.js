'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home/landing.html',
            controller: 'homeCtrl'
        });
    }])

    .controller('homeCtrl', ['$rootScope', '$scope', 'topicService', function($rootScope, $scope, topicService) {

        // If user logged in, redirect
        if ($rootScope.user) {
            return $rootScope.goTo('/feed');
        }

        // Get topics and display
        topicService.getAllTopics().then(
            function (topics) {
                $scope.topics = topics;
            },
            function (err) {
                console.log(err);
            });


        //
        $scope.register = function () {
            var selected = [];

            $scope.topics.forEach(function(topic) {
                if(topic.selected)
                    selected.push(topic);
            });

            console.log(selected);
        };

    }]);
