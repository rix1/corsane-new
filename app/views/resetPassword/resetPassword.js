'use strict';

angular.module('myApp.resetPassword', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/reset', {
            templateUrl: 'views/resetPassword/resetPassword.html',
            controller: 'resetPasswordCtrl'
        })
    }])

    .controller('resetPasswordCtrl', ['$scope', '$rootScope', '$location', 'userService',
        function($scope, $rootScope, $location, userService) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if($rootScope.user) {
                $location.path("/profile");
            }

            $scope.submit = function (form) {
                $scope.error.err = false;

                if (!form || !form.email) {
                    $scope.error.err = true;
                    $scope.error.msg = "Please fill in a valid email address";
                } else {
                    $scope.pending = true;
                    resetPassword(form);
                }
            };

            var resetPassword = function (form) {
                userService.reset_password(form)
                    .then(function (res) {
                        console.log("email sent");
                        $scope.pending = false;
                    }, function (err) {
                        $scope.pending = false;
                        $scope.error.msg = err.message;
                        $scope.error.err = true;
                    });
            };

        }]);