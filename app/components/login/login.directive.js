angular.module('myApp.directives.login', [])
    .directive('login', function () {
        return {
            restrict: 'E',
            scope: '',
            templateUrl: "components/login/login.html",
            controller: 'loginCtrl'
        };
    })

    .controller('loginCtrl', ['$scope', 'authService', function($scope, authService) {
        var user = {};
        var text = ['login', 'sign up', 'register'];


        $scope.user = user;

        $scope.login = false;
        $scope.showpw = false;
        $scope.switch = function () {

            $scope.login ? ($scope.h1 = text[1]):($scope.h1 = text[0]);
            $scope.login ? ($scope.alt = text[0]):($scope.alt = text[1]);
            $scope.login ? ($scope.btn = text[2]):($scope.btn = text[0]);
            $scope.login = !$scope.login;

        };
        $scope.h1 = text[1];
        $scope.alt = text[0];
        $scope.btn = text[1];

        $scope.submit = function (form) {
            console.log(form);
            authService.login(form.email, form.password)
                .then(function (res) {
                    console.log(res);
                }, function (err) {
                    console.log(err);
                });
        }
    }]);