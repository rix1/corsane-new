'use strict';

angular.module('myApp.profile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        })
    }])

    .controller('profileCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
        // something

        $scope.user = $rootScope.user;

        console.log($rootScope.user);
        console.log($scope.user);
        console.log("EEEEII");

/*
        function isEmpty(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }

            return true;
        }
*/

        if(false){
            $location.path("/login");
        }

        // TODO: Write cookie

        $scope.logout = function () {
            $location.path("/logout");
        };

    }]);