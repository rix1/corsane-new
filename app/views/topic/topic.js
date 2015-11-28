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
            console.log("or here?");
            topicService.getTopic(topicId).then(
                function(topic) {
                    console.log("or after its received?");
                    $scope.topic = topic;
                },
                function(err) {
                    console.log("or after its received?");
                    console.log(err);
                }
            );
            
            $scope.getArticle = function(id) {
                $state.go('showArticle', {id: id});
            }
        }
    ]);