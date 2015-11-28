'use strict';

angular.module('myApp.resetPassword', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('resetPw', {
                url: "/reset",
                templateUrl: 'views/resetPassword/resetPassword.html',
                controller: 'resetPasswordCtrl'
            });
    }])

    .controller('resetPasswordCtrl', ['$scope', '$rootScope', '$state', 'userService',
        function($scope, $rootScope, $state, userService) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};
            $scope.emailSent = false;

            // Redirect logged in users to their profile
            if($rootScope.user) {
                $state.go('profile');
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
                        $scope.pending = false;
                        $scope.emailSent = true;
                    }, function (err) {
                        $scope.pending = false;
                        $scope.error.msg = err.message;
                        $scope.error.err = true;
                    });
            };

        }]);