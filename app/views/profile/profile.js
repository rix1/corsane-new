'use strict';

angular.module('myApp.profile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        })
    }])

    .controller('profileCtrl', ['$rootScope', '$scope', '$location', 'userService', function($rootScope, $scope, $location, userService) {

        if (!$rootScope.user) {
            $location.path("/login");
        }

        $scope.logout = function () {
            $location.path("/logout");
        };

        $scope.passwordForm = false;

        $scope.togglePasswordForm = function() {
            $scope.passwordForm = !$scope.passwordForm;
        };

        $scope.changePassword = function () {
            if(this.newPassword !== this.repeatedNewPassword) {
                $scope.error = "Password mismatch";
            }
            else {
                userService.change_password(this.newPassword).then(
                    function(res) {
                        $scope.successMessage = "Your password has been updated";
                        $scope.passwordForm = false;
                    },
                    function(err) {
                        $scope.error = err;
                    });
            }
        };

        $scope.deleteAccount = function () {
            userService.deleteAccount($rootScope.user.id).then(
                function(res) {
                    $scope.logout();
                },
                function(err) {
                    console.log("Something went wrong")
                });
        };
    }]);