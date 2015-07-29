angular.module('myApp.directives.topicBox', [])
    .directive('topicBox', function () {
        return {
            restrict: 'E',
            scope: {
                topic: '='
            },
            templateUrl: "components/topicBox/topicBox.html",
            controller: 'topicBoxCtrl'
        }
    })
    .controller('topicBoxCtrl', ['$scope', function ($scope) {
        $scope.changeClass = function (topic) {
            topic.selected = !topic.selected;
            //$scope.box = "selected";
            console.log(topic);
        };
    }]);