'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngStorage',
    'ngSanitize',
    'ngCookies',

    'myApp.config',
    'myApp.landing',
    'myApp.profile',
    'myApp.article',
    'myApp.topicList',
    'myApp.topic',
    'myApp.login',
    'myApp.logout',
    'myApp.resetPassword',
    'myApp.register',
    'myApp.lab',

    'myApp.directives.editable',
    'myApp.directives.navbar',
    'myApp.directives.paragraph',
    'myApp.directives.topicBox',
    'myApp.directives.spinner',
    'myApp.directives.ngReallyClick',

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

    .run(['$http', '$rootScope', '$location', 'authService', 'apiService',
        function($http, $rootScope, $location, authService, apiService) {

            // Add CSRF token to header
            authService.getCSRF().then(function (token) {
                $http.defaults.headers.common['x-csrf-token'] = token;
            });

            // Set user from token
            $rootScope.user = apiService.getClaimsFromToken();

            // Global function for changin view
            $rootScope.goTo = function(route) {
                $location.path(route);
            }
        }
    ]);