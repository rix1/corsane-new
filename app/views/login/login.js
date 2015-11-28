//'use strict';

angular.module('myApp.login', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'views/login/login.html',
                controller: 'authCtrl'
            });
    }])

    .controller('authCtrl', ['$scope', '$rootScope', '$state', 'authService', 'jwtHelper',
        function($scope, $rootScope, $state, authService, jwtHelper) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if($rootScope.user) {
                $state.go('profile');
            }

            $scope.submit = function (form) {
                $scope.error.err = false;

                if (!form || !form.username || !form.password) {
                    $scope.error.err = true;
                    $scope.error.msg = "Please fill in both username and password";
                } else {
                    $scope.pending = true;
                    login(form);
                }
            };

            var login = function (credentials) {
                authService.login(credentials)
                    .then(function (res) {
                        //$state.path("/profile");
                        console.log("login successful");
                        var tokenPayload = jwtHelper.decodeToken(res.token);

                        console.log(tokenPayload);
                    }, function (err) {
                        $scope.pending = false;
                        $scope.error.msg = err.message;
                        $scope.error.err = true;
                    });
            };

            $scope.loginWithFacebook = function() {
                authService.loginWithFacebook();
            };

        }]);