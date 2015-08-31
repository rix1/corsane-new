'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'views/register/register.html',
            controller: 'registerCtrl'
        });
    }])

    .controller('registerCtrl', ['$scope', '$rootScope', '$routeParams', 'userService', 'authService',
        function($scope, $rootScope, $routeParams, userService, authService) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if($rootScope.user) {
                $rootScope.goTo('/profile');
            }

            $scope.submit = function (form) {
                $scope.error.err = false;
                $scope.pending = true;

                register(form);
            };

            var register = function (userInfo) {

                if($routeParams.topics) {
                    userInfo.topic_subscriptions = $routeParams.topics;
                    delete $routeParams.topics;
                }

                userService.register(userInfo).then(
                    function (res) {
                        var user = {
                            username: userInfo.username,
                            password: userInfo.password
                        };

                        authService.login(user).then(
                            function (res) {
                                $rootScope.goTo("/feed");
                            },
                            function (err) {
                                $scope.pending = false;
                                $scope.error.msg = err.message;
                                $scope.error.err = true;
                            });

                    },
                    function (err) {
                        $scope.pending = false;
                        $scope.error.msg = err.message;
                        $scope.error.err = true;
                    });
            };

        }
    ]);