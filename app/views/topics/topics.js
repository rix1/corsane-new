angular.module('myApp.topics', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/topics', {
            templateUrl: 'views/topics/topics.html',
            controller: 'topicsCtrl'
        });
    }])

    .controller('topicsCtrl', ['topicService', function(topicService) {
        var t = this;

        topicService.getAllTopics().then(
            function(topics) {
                t.topics = topics;
            },

            function(err) {
                console.log(err);
            });

    }]);