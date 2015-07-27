angular.module('myApp.directives.topicBox', [])
    .directive('topicBox', function () {
        return {
            restrict: 'E',
            scope: {
              topic: '='
            },
            templateUrl: "components/topicBox/topicBox.html",
            controller: function ($scope) {
                $scope.changeClass = function (topic) {
                    topic.selected = !topic.selected;
                    //$scope.box = "selected";
                    console.log(topic);
                };
            }
        }
    });