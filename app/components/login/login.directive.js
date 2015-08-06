angular.module('myApp.directives.login', [])
    .directive('login', function () {
        return {
            restrict: 'E',
            scope: '',
            templateUrl: "components/login/login.html",
            controller: 'loginCtrl'
        };
    })

    .controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', 'authService', 'userService',
        function($rootScope, $scope, $http, $location, authService, userService) {

            var models = [{h1: "login",alt:"sign up",btn:"login",login:true},{h1: "sign up",alt:"login",btn:"register"}];
            var loginURL = ('/login' === $location.path());
            $scope.pending = false;
            $scope.error = {err:false, msg:""};

            // Redirect logged in users to their profile
            if($rootScope.user.id) {
                $location.path("/profile");
            }

            $scope.model = loginURL ? models[0]:models[1];
            $scope.switch = function () {
                if(loginURL){
                    $location.path("/register");
                }else{
                    $location.path("/login");
                }
            };

            $scope.submit = function (form) {
                $scope.error.err = false;

                if (!form || !form.username || !form.password) {
                    $scope.error.err = true;
                    $scope.error.msg = "Please fill in the fields";
                } else {
                    $scope.pending = true;

                    if (loginURL) {
                        login(form);
                    } else {
                        register(form)
                    }
                }
            };

            var login = function (userCred) {
                authService.login(userCred)
                    .then(function (res) {
                        $rootScope.user = res.user;
                        $location.path("/profile");
                    }, function (err) {
                        $scope.pending = false;
                        $scope.error.msg = err.message;
                        $scope.error.err = true;
                    });
            };

            var register = function (userInfo) {
                userService.register(userInfo)
                    .then(function (res) {
                        var user = {
                            username: userInfo.username,
                            password: userInfo.password
                        };
                        login(user);
                    }, function (err) {
                        $scope.pending = false;
                        $scope.error.msg = err.message;
                        $scope.error.err = true;
                        console.log(err);
                    });
            };
        }]);