'use strict';

angular.module('myApp.register', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('register', {
                url: "/register?topics",
                templateUrl: 'views/register/register.html',
                controller: 'registerCtrl'
            });
    }])

    .controller('registerCtrl', ['$scope', '$rootScope', '$stateParams', 'userService', 'authService', '$state',
        function($scope, $rootScope, $stateParams, userService, authService, $state) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if($rootScope.user) {
                //$rootScope.goTo('/profile');
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
                                //$rootScope.goTo("/feed");
                                $scope.go('feed')
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