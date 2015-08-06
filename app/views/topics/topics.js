angular.module('myApp.topics', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/topics', {
            templateUrl: 'views/topics/topics.html',
            controller: 'topicsCtrl'
        });
    }])

    .controller('topicsCtrl', ['$scope', 'topicService', function($scope, topicService) {

        topicService.getAllTopics().then(
            function(topics) {
                $scope.topics = topics;
            },

            function(err) {
                console.log(err);
            });

    }]);