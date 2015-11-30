'use strict';

angular.module('myApp.topic', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('topic', {
                url: "/topic/{id}",
                templateUrl: 'views/topic/topic.html',
                controller: 'topicCtrl',
                data: {
                    login: false,
                    admin: false
                }
            });
    }])

    .controller('topicCtrl', ['$scope', '$stateParams', '$state', 'topicService',
        function($scope, $stateParams, $state, topicService) {

            $scope.authors = [];

            var topicId = $stateParams.id;
            topicService.getTopic(topicId).then(
                function(topic) {
                    $scope.topic = topic;
                },
                function(err) {
                    //console.log(err);
                }
            );
            
            $scope.getArticle = function(id) {
                $state.go('showArticle', {id: id});
            }
        }
    ]);