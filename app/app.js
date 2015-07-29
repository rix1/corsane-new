'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.landing',
    'myApp.profile',
    'myApp.article',
    'myApp.topic',
    'myApp.version',
    'myApp.directives.topicBox',
    'myApp.directives.navbar'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/landing'});
    }]);