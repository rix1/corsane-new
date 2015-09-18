angular.module('myApp.directives.paragraph', [])
    .directive('paragraph', [function () {
        return {
            restrict: 'E',
            scope: {
                content: '=',
                something: '&'
            },
            templateUrl: "components/paragraph/paragraph.html",
            controller: 'paraCtrl'
        };
    }])

    .controller('paraCtrl', ['$scope', function($scope) {

        $scope.testA = false;
        $scope.testB = false;

        var latestA = "";
        var latestB = "";

        $scope.$watch('testA', function (newval, oldval) {
            if(newval === true) {
                $scope.content.headline = latestA;
                $scope.content.changed = true;
            }
            $scope.testA = false;
        });

        $scope.$watch('testB', function (newval, oldval) {
            if(newval === true) {
                $scope.content.text = latestB;
                $scope.content.changed = true;
            }
            $scope.testB = false;
        });

        $scope.$watch('a.content', function (newval, oldval) {
            if(newval != oldval) {
                latestA = newval;
            }
        });

        $scope.$watch('b.content', function (newval, oldval) {
            if(newval != oldval) {
                latestB = newval
            }
        });
    }]);