'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.landing',
    'myApp.profile',
    'myApp.article',
    'myApp.topics',
    'myApp.topic',
    'myApp.login',
    'myApp.directives.login',
    'myApp.directives.navbar',
    'myApp.directives.paragraph',
    'myApp.directives.topicBox',
    'myApp.directives.logout',
    'myApp.services'
])

    .config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
        $routeProvider.otherwise({redirectTo: '/landing'});

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfHeaderName = 'x-csrf-token';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
    }])

    .constant('config', {
        // backend enpoint
        baseUrl: 'http://10.0.1.123:1337/' // TODO: Change to localhost
    })

    .run(['$injector', '$http', 'authService',
        function($injector, $http, authService) {

            // Add CSRF token to header
            authService.getCSRF().then(function (token) {
                $http.defaults.headers.common['x-csrf-token'] = token;
            });
        }]);
