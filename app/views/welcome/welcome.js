'use strict';

angular.module('myApp.welcome', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('welcome', {
                url: "/welcome",
                templateUrl: 'views/welcome/welcome.html',
                controller: 'welcomeCtrl'
            });
    }])

    .controller('welcomeCtrl', ['$rootScope', '$scope', 'topicService', '$state',
        function($rootScope, $scope, topicService, $state) {

            console.log("WelcomeWelcomeWelcome!");

            // If user logged in, display feed
            if ($rootScope.user) {
                //return $rootScope.goTo('/');
                $state.go('feed');

            }


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

                //$rootScope.goTo('/register', {topics: selectedTopics});
                $state.go('register', {topics: selectedTopics});
            };

        }]);