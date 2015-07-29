angular.module('myApp.directives.menuBar', [])
    .directive('menuBar', function () {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            templateUrl: "components/menuBar/menuBar.html",
            controller: function ($scope) {
                console.log("Menu bar directive called");

                $($document).ready(function () {
                    $("#frank").html("This IS FRAAANK");
                });
            }
        };
    });