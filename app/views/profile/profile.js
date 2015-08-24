'use strict';

angular.module('myApp.profile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        })
    }])

    .controller('profileCtrl', ['$rootScope', '$scope', '$location', 'userService', function($rootScope, $scope, $location, userService) {

        $scope.error = "";

        if (!$rootScope.user) {
            $location.path("/login");
        }

        $scope.passwordForm = false;

        $scope.togglePasswordForm = function() {
            $scope.passwordForm = !$scope.passwordForm;
        };

        $scope.changePassword = function () {
            console.log("Pw changed");
            console.log(this.newPassword);
            if(this.newPassword !== this.repeatedNewPassword) {
                $scope.error = "Password mismatch";
            }
            else {
                userService.change_password(this.newPassword).then(
                    function(res) {
                        console.log("worked");
                    },
                    function(err) {
                        console.log("fail");
                        console.log(err);
                    });
            }


            // Vis response
        };



        $scope.logout = function () {
            $location.path("/logout");
        };



        $scope.deleteAccount = function () {
            console.log('Delete');
            // TODO: Delete account
        };
    }]);