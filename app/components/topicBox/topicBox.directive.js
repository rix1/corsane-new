angular.module('myApp.directives.topicBox', [])
    .directive('topicBox', [function () {
        return {
            restrict: 'E',
            scope: {
                topic: '=',
                selectable: '='
            },
            templateUrl: "components/topicBox/topicBox.html",
            controller: 'topicBoxCtrl'
        }
    }])

    .controller('topicBoxCtrl', ['$scope','$window', '$location', function ($scope, $window, $location) {

        if($scope.selectable){
            $scope.topic.class = 'selectable';
        }else{
            $scope.topic.class = 'hoverhand selectable';
        }
        //$scope.topic.class.concat(' selectable')


        var changeClass = function (topic) {
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

        $scope.getTopic = function(topic) {
            if($scope.selectable){
                changeClass(topic)
            }else{
                $location.path("/topic/" + topic.id);
                console.log("TopicBoxCtrl: Topic is not defined");
            }
        }
    }]);