angular.module('myApp.topicList', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/topicList', {
            templateUrl: 'views/topicList/topicList.html',
            controller: 'topicListCtrl'
        });
    }])

    .controller('topicListCtrl', ['$scope', 'topicService', function($scope, topicService) {

        topicService.getAllTopics().then(
            function(topics) {
                console.log(topics);
                $scope.topicList = topics;
            },

            function(err) {
                console.log(err);
            });

    }]);