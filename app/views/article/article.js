'use strict';

angular.module('myApp.article', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/article', {
    templateUrl: 'views/article/article.html',
    controller: 'articleCtrl'
  });
}])

.controller('articleCtrl', [function() {

}]);