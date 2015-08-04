'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.landing',
    'myApp.profile',
    'myApp.article',
    'myApp.topics',
    'myApp.topic',
    'myApp.version',
    'myApp.directives.topicBox',
    'myApp.directives.login',
    'myApp.directives.navbar',
    'myApp.directives.paragraph',
    'myApp.services'
])

    .config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
        $routeProvider.otherwise({redirectTo: '/landing'});

        // Initiate http interceptor which adds a token to every http request
        //$httpProvider.interceptors.push('httpInterceptor');
        $httpProvider.defaults.xsrfHeaderName = 'x-csrf-token';
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';

        //$httpProvider.defaults.headers.common['x-csrf-token'] = "jsq8FhoK-qzI8fvLiAWTgTTdYjx9lUJGKLZo";
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
                console.log(token);
            });

            // Injects the authorization header on each api call
/*            $injector.get("$http").defaults.transformRequest = function (data, headersGetter) {
                if (userService.isLoggedIn()) {
                    headersGetter()['Authorization'] = 'Bearer ' + $rootScope.oauth.token;
                }

                if (data) {
                    return data;
                }
            }*/
        }]);