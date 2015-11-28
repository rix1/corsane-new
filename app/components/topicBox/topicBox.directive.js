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

    .controller('topicBoxCtrl', ['$scope', '$state', function ($scope, $state) {
        //$state.go('topic', {id: topic.id});

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
                //$window.location.href = '#/topic';
                $state.go('topics');
            }
        };

        $scope.getTopic = function(topic) {
            if($scope.selectable){
                changeClass(topic)
            }else{
                console.log("do i crash here?");
                $state.go('topic', {id: topic.id});
            }
        }
    }]);