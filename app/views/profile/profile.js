'use strict';

angular.module('myApp.profile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/user/:id', {
                templateUrl: 'views/profile/profile.html',
                controller: 'profileCtrl'
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.html',
                controller: 'myProfileCtrl'
            })
    }])

    .controller('profileCtrl', ['$scope', '$routeParams', 'userService',
        function($scope, $routeParams, userService) {

            var userId = $routeParams.id;

            userService.getUser(userId).then(
                function(res) {
                    $scope.user = res;
                },
                function(err) {
                    console.log(err);
                });
        }
    ])

    .controller('myProfileCtrl', ['$rootScope', '$scope', 'userService',
        function($rootScope, $scope, userService) {

            $scope.myArticles = {};




            if(!$rootScope.user) {
                return $rootScope.goTo("/login");
            }

            $scope.user = $rootScope.user;

             userService.getUser($scope.user.id).then(
             function(res) {
             $scope.myArticles = res.articles;
             },
             function(err) {
             console.log(err);
             });


            $scope.logout = function () {
                $rootScope.goTo("/logout");
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
        }
    ]);