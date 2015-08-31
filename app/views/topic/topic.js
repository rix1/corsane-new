'use strict';

angular.module('myApp.topic', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/topic/:id', {
            templateUrl: 'views/topic/topic.html',
            controller: 'topicCtrl'
        });
    }])

    .controller('topicCtrl', ['$scope', '$routeParams', '$location', 'topicService',
        function($scope, $routeParams, $location, topicService) {

            $scope.authors = [];

            var topicId = $routeParams.id;
            topicService.getTopic(topicId).then(
                function(topic) {
                    console.log(topic);
                    $scope.topic = topic;
                },
                function(err) {
                    console.log(err);
                }
            );

            $scope.getArticle = function(id) {
                $location.path("/article/" + id);
            }
        }
    ]);