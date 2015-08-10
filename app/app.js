'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngStorage',
    'myApp.config',
    'myApp.landing',
    'myApp.profile',
    'myApp.article',
    'myApp.topicList',
    'myApp.topic',
    'myApp.login',
    'myApp.lab',

    'myApp.directives.login',
    'myApp.directives.navbar',
    'myApp.directives.paragraph',
    'myApp.directives.topicBox',
    'myApp.directives.logout',
    'myApp.directives.spinner',
    'myApp.services'
])

    .config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfHeaderName = 'x-csrf-token';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
        //$locationProvider.html5Mode(true);
    }])

    .run(['$injector', '$http', '$rootScope', 'authService', 'apiService',
        function($injector, $http, $rootScope, authService, apiService) {
            // Add CSRF token to header
            authService.getCSRF().then(function (token) {
                $http.defaults.headers.common['x-csrf-token'] = token;
            });
            $rootScope.user = apiService.getClaimsFromToken();
            console.log($rootScope.user);
        }
    ]);