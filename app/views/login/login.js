//'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'authCtrl'
        })
    }])

    .controller('authCtrl', ['$scope', '$rootScope', '$location', 'authService',
        function($scope, $rootScope, $location, authService) {

            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if($rootScope.user) {
                return $location.path("/profile");
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
                        $location.path("/profile");
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