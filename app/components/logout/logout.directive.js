angular.module('myApp.directives.logout', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'logoutCtrl',
            template: ''
        })
    }])

    .controller('logoutCtrl', ['$rootScope', '$scope', '$location', 'authService', function($rootScope, $scope, $location, authService) {
        console.log("logout!");
        authService.logout()
            .then(function (res) {
                console.log(res);
                console.log($rootScope.user);
                $rootScope.user = {};
                console.log($rootScope.user);

                $location.path('/landing');
            }, function (err) {
                console.log(err);
            });
    }]);