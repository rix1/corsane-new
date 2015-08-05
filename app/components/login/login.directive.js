angular.module('myApp.directives.login', [])
    .directive('login', function () {
        return {
            restrict: 'E',
            scope: '',
            templateUrl: "components/login/login.html",
            controller: 'loginCtrl'
        };
    })

    .controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', 'authService', function($rootScope, $scope, $http, $location, authService) {
        var text = ['login', 'sign up', 'register'];
        var models = [{h1: "login",alt:"sign up",btn:"login",login:true},{h1: "sign up",alt:"login",btn:"register"}];

        var loginURL = ('/login' === $location.path());

        $scope.pending = false;
        // Redirect logged in users to their profile
        if($rootScope.user) {
            $location.path("/profile");
        }

        $scope.error = {err:false, msg:""};

        $scope.model = loginURL ? models[0]:models[1];
        $scope.showpw = false;
        $scope.switch = function () {
            if(loginURL){
                $location.path("/register");
            }else{
                $location.path("/login");
            }
        };
        $scope.login = function (form) {
            $scope.error.err = false;

            if (!form || !form.email || !form.password) {
                $scope.error.err = true;
                $scope.error.msg = "Please fill in the fields";
            } else {
                $scope.pending = true;
                if (loginURL) {
                    authService.login(form.email, form.password)
                        .then(function (res) {
                            $http.defaults.headers.common['Authorization'] = "Bearer " + res.token;
                            $rootScope.user = res.user;
                            $location.path("/profile");
                        }, function (err) {
                            $scope.pending = false;
                            $scope.error.msg = err.message;
                            $scope.error.err = true;
                        });
                } else {
                    authService.register(form.email, form.password)
                        .then(function (res) {
                            $http.defaults.headers.common['Authorization'] = "Bearer " + res.token;
                            $location.path("/login");
                        }, function (err) {
                            $scope.pending = false;
                            $scope.error.msg = err.message;
                            $scope.error.err = true;
                            console.log(err);
                        });
                }
            }
        };
    }]);