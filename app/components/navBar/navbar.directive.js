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

    .controller('navCtrl', ['$scope', function($scope) {
        console.log("Navbar directive called");
    }]);