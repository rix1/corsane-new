'use strict';

angular.module('myApp.logout', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('logout', {
                url: "/logout",
                controller: 'logoutCtrl',
                template: '',
                data: {
                    login: true,
                    admin: false
                }
            });
    }])

    .controller('logoutCtrl', ['$rootScope', '$scope', '$state', 'authService',
        function($rootScope, $scope, $state, authService) {

            authService.logout()
                .then(function (res) {
                    $state.go('welcome');
                }, function (err) {
                    //console.log(err);
                });
        }]);