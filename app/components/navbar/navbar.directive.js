angular.module('myApp.directives.navbar', [])
    .directive('navbar', [function () {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            replace: true,
            templateUrl: "components/navbar/navbar.html",
            controller: 'navCtrl'
        };
    }])

    .controller('navCtrl', ['$scope', '$state', 'userService', '$rootScope',
        function($scope, $state, User, $rootScope) {

            $scope.user = User.currentUser().isAuthenticated();

            $rootScope.$on('$stateChangeStart', function (event, to, from) {
                $scope.user = User.currentUser().isAuthenticated();
            });

            $scope.checked = function () {
                $scope.check = false;
            };
        }]);