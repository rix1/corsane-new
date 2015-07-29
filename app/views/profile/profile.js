'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: '/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', [function() {

}]);