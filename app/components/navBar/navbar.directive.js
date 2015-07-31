angular.module('myApp.directives.navbar', [])
    .directive('navbar', function () {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            replace: true,
            templateUrl: "components/navbar/navbar.html",
            /*compile: function (tElm) {

                return function (scope, element, attrs) {
                    scope.$watch(model, function (value) {
                        //model.attr(ng-model);
                        console.log("Changed! " + model.attr());
                    });
                }
            },*/
            controller: 'navCtrl'
        };
    })

    .controller('navCtrl', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
        $scope.isActive = function (destination) {
            return destination === $location.path();
        };


        $scope.model = {};

        $scope.model.check = true;

        $scope.open = 'custom-wrapper';
        $scope.toggle = '';
        $scope.list = '';


        $scope.$watch('model.check', function (old, newval) {
            console.log("Changed from: " + old + ", to " + newval);

            if(old){
                $scope.open = 'custom-wrapper';
                $scope.toggle = '';
                $scope.list = 'pure-menu-horizontal';
            }else{
                $scope.open = 'custom-wrapper open';
                $scope.list = '';
                $scope.toggle = 'x';
            }
        });
    }]);