'use strict';

angular.module('myApp.welcome', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'views/welcome/welcome.html',
            controller: 'welcomeCtrl'
        });
    }])

    .controller('welcomeCtrl', ['$rootScope', '$scope', 'topicService', 'AuthStore', function($rootScope, $scope, topicService, AuthStore) {


        // DEMO:
        var myObj1 = {name: 'FAEN', pw:'gunnar'};
        AuthStore.set('user', myObj1);
        var frank = AuthStore.get('user');
        console.log(frank);
        // DEMO END


        // If user logged in, display feed
        if ($rootScope.user) {
            return $rootScope.goTo('/');
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

            $rootScope.goTo('/register', {topics: selectedTopics});
        };

    }]);