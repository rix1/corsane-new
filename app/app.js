'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngStorage',
    'ngSanitize',
    'ngCookies',

    'myApp.config',
    'myApp.welcome',
    'myApp.profile',
    'myApp.article',
    'myApp.topicList',
    'myApp.topic',
    'myApp.login',
    'myApp.logout',
    'myApp.resetPassword',
    'myApp.register',
    'myApp.lab',
    'myApp.feed',

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

            // Global function for changing view
            $rootScope.goTo = function(route, params) {
                var searchParams = params || {};
                return $location.path(route).search(searchParams);
            };

            // Add CSRF token to header
            authService.getCSRF().then(function (token) {
                $http.defaults.headers.common['x-csrf-token'] = token;
            });

            // Get user from token (if it exists)
            var user = apiService.getClaimsFromToken();

            // Check if user was in token
            if(user && authService.isTokenExpired(user)) {
                // TODO: Refresh token regardless of exp
                console.log("FUFUFUFUFUFUFUFUFFUU");
                // TODO: HANDLE ERROR:
                // - delete $rootScope.user
                // goTo /login
            }

            $rootScope.user = user;

            // TODO: Set token refresh intervals (~once every hour)
        }
    ]);