angular.module('myApp.directives.spinner', [])
    .directive('spinner', [function () {
        return {
            restrict: 'E',
            templateUrl: "components/spinner/spinner.html",
            controller: 'spinnerCtrl'
        };
    }])

    .controller('spinnerCtrl', ['$scope', function($scope) {
    }]);