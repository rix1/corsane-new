'use strict';

angular.module('myApp.welcome', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('welcome', {
                url: "/welcome",
                templateUrl: 'views/welcome/welcome.html',
                controller: 'welcomeCtrl',
                data: {
                    login: false,
                    admin: false
                }
            });
    }])

    .controller('welcomeCtrl', ['$scope', 'topicService', '$state',
        function($scope, topicService, $state) {

            //console.log("WelcomeWelcomeWelcome!");

            // Get topics and display
            topicService.getAllTopics().then(
                function (topics) {
                    $scope.topics = topics;
                },
                function (err) {
                    console.log(err);
                });


            $scope.register = function () {
                var selectedTopics = [];

                $scope.topics.forEach(function(topic) {
                    if(topic.selected)
                        selectedTopics.push(topic.id);
                });

                $state.go('register', {topics: selectedTopics});
            };

        }]);