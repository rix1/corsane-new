'use strict';

angular.module('myApp.topic', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topic', {
    templateUrl: 'views/topic/topic.html',
    controller: 'topicCtrl'
  });
}])

.controller('topicCtrl', [function() {

}]);