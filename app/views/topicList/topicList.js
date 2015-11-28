angular.module('myApp.topicList', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('topics', {
                url: "/topics",
                templateUrl: 'views/topicList/topicList.html',
                controller: 'topicListCtrl',
                data: {
                    login: false,
                    admin: false
                }
            });
    }])

    .controller('topicListCtrl', ['$scope', 'topicService', function($scope, topicService) {

        topicService.getAllTopics().then(
            function(topics) {
                $scope.topicList = topics;
            },

            function(err) {
                //console.log(err);
            });

    }]);