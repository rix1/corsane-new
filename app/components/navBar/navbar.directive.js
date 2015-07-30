angular.module('myApp.directives.navbar', [])
    .directive('navbar', function () {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            templateUrl: "components/navbar/navbar.html",
            controller: 'navCtrl'
        };
    })

    .controller('navCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function (destination) {
            return destination === $location.path();
        }
    }]);