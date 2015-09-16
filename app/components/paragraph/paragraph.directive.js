angular.module('myApp.directives.paragraph', [])
    .directive('paragraph', [function () {
        return {
            restrict: 'E',
            scope: {
                content: '='
            },
            templateUrl: "components/paragraph/paragraph.html",
            controller: 'paraCtrl'
        };
    }])

    .controller('paraCtrl', ['$scope', function($scope) {

        $scope.a = {
            content: $scope.content.headline
        };
        $scope.b = {
            content: $scope.content.text
        };

        $scope.$watch('a.content', function (newval, oldval) {
            if(newval != oldval) {
                $scope.content.headline = newval;
                $scope.content.changed = true;
            }
        });

        $scope.$watch('b.content', function (newval, oldval) {
            if(newval != oldval) {
                $scope.content.text = newval;
                $scope.content.changed = true;
            }
        });
    }]);