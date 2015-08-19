'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
                templateUrl: 'views/register/register.html',
                controller: 'registerCtrl'
            });
    }])

    .controller('registerCtrl', ['$scope', '$rootScope', '$location', 'userService', 'authService',
        function($scope, $rootScope, $location, userService, authService) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if($rootScope.user) {
                $location.path("/profile");
            }

            $scope.submit = function (form) {
                $scope.error.err = false;

                // TODO: Switch case this B
                if (!form || !form.username || !form.password) {
                    $scope.error.err = true;
                    $scope.error.msg = "Please fill in the fields";
                } else {
                    $scope.pending = true;
                    register(form);
                }
            };

            var register = function (userInfo) {
                userService.register(userInfo)
                    .then(function (res) {
                        var user = {
                            username: userInfo.username,
                            password: userInfo.password
                        };

                        authService.login(user)
                            .then(function (res) {
                                $location.path("/profile");
                            }, function (err) {
                                $scope.pending = false;
                                $scope.error.msg = err.message;
                                $scope.error.err = true;
                            });

                    }, function (err) {
                        $scope.pending = false;
                        $scope.error.msg = err.message;
                        $scope.error.err = true;
                    });
            };

        }]);