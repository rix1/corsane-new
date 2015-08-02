angular.module('myApp.directives.paragraph', [])
    .directive('paragraph', function () {
        return {
            restrict: 'E',
            scope: {
                content: '=',
                prev: '='
            },
            templateUrl: "components/paragraph/paragraph.html",
            controller: 'paraCtrl'
        };
    })

    .controller('paraCtrl', ['$scope', function($scope) {

        $scope.isIntro = 'readable';

        $scope.getText = function (text) {
            console.log("paragraphCtrl: working");
            if($scope.prev){
                $scope.isIntro = 'intro';
                return text.slice(0, 100);
            }
            return text;
        };
    }]);