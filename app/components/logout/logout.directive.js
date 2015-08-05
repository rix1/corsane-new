angular.module('myApp.directives.logout', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'logoutCtrl',
            template: ''
        })
    }])

    //.directive('logout', function () {
    //    return {
    //        restrict: 'E',
    //        scope: '',
    //        controller: 'logoutCtrl',
    //        replace: true,
    //        template: '<div class="center-text"><button ng-click="logout()" class="pure-button">Logout</button></div>'
    //    };
    //})

    .controller('logoutCtrl', ['$rootScope', '$scope', '$location', 'authService', function($rootScope, $scope, $location, authService) {
        console.log("logout!");
        authService.logout()
            .then(function (res) {
                console.log(res);
                console.log($rootScope.user);
                delete $rootScope.user;
                console.log($rootScope.user);

                $location.path('/landing');
            }, function (err) {
                console.log(err);
            });
    }]);