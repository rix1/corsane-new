angular.module('myApp.directives.topicBox', [])
    .directive('topicBox', function () {
        return {
            restrict: 'E',
            scope: {
                topic: '=',
                selectable: '='
            },
            templateUrl: "components/topicBox/topicBox.html",
            controller: 'topicBoxCtrl'
        }
    })
    .controller('topicBoxCtrl', ['$scope','$window', function ($scope, $window) {

        if($scope.selectable){
            $scope.topic.class = 'selectable';
        }else{
            $scope.topic.class = 'hoverhand';
        }

        $scope.changeClass = function (topic) {
            if($scope.selectable) {
                topic.selected = !topic.selected;
                if (topic.selected) {
                    topic.class = 'selected';
                } else {
                    topic.class = 'selectable';
                }
            }else{
                $window.location.href = '#/topic';
            }
        };
    }]);