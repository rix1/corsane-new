angular.module('myApp.directives.navbar', [])
    .directive('navbar', [function () {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            replace: true,
            templateUrl: "components/navbar/navbar.html",
            controller: 'navCtrl'
        };
    }])

    .controller('navCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {

        $scope.checked = function () {
            $scope.check = false;
        };

        $scope.isActive = function (destination) {
            console.log($state.current);
            return true; // todo: NEVER FORGET... THIS..
            //return (destination === $state.path());
        };
        $scope.model = {};
        $scope.model.check = true;

        $scope.open = 'custom-wrapper';
        $scope.toggle = '';
        $scope.list = '';


        $scope.$watch('model.check', function (old, newval) {

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