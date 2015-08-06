angular.module('myApp.directives.logout', [])

    .directive('logout', function () {
        return {
            restrict: 'E',
            scope: '',
            controller: 'logoutCtrl',
            replace: true,
            template: '<div class="center-text"><button ng-click="logout()" class="pure-button">Logout</button></div>'
        };
    })

    .controller('logoutCtrl', ['$rootScope', '$scope', '$location', 'authService', function($rootScope, $scope, $location, authService) {

        $scope.logout = function () {
            authService.logout()
                .then(function (res) {
                    console.log(res);
                    $location.path('/landing');
                }, function (err) {
                    console.log(err);
                });
        }
    }]);