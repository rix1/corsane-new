'use strict';

angular.module('myApp.register', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('register', {
                url: "/register?topics",
                templateUrl: 'views/register/register.html',
                controller: 'registerCtrl',
                data: {
                    login: false,
                    admin: false
                }
            });
    }])

    .controller('registerCtrl', ['$scope', '$stateParams', 'userService', 'authService', '$state',
        function($scope, $stateParams, userService, authService, $state) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if(userService.currentUser().isAuthenticated()) {
                $state.go('myProfile');
            }

            $scope.submit = function (form) {
                $scope.error.err = false;
                $scope.pending = true;

                register(form);
            };

            var register = function (userInfo) {

                // If topics is part of GET request, add them to the user object before registration
                if($stateParams.topics)
                    userInfo.topic_subscriptions = $stateParams.topics;

                userService.register(userInfo).then(
                    function (res) {
                        var user = {
                            username: userInfo.username,
                            password: userInfo.password
                        };

                        authService.login(user).then(
                            function (res) {
                                $state.go('feed');
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