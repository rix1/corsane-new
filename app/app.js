'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    //'ngStorage',
    'angular-storage',
    'angular-jwt',
    'ngSanitize',

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
    'myApp.directives.modalDialog',

    'myApp.services'
])

    .config(['$httpProvider', '$routeProvider', 'jwtInterceptorProvider', function ($httpProvider, $routeProvider, jwtInterceptorProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfHeaderName = 'x-csrf-token';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        jwtInterceptorProvider.tokenGetter = ['AuthStore', function (AuthStore) {
            return AuthStore.get('jwt');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');


        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'request': function (config) {              // Is run once per request
                    return config;
                },

                'responseError': function (response) {
                    console.log("Response error: " + response.status);

                    if(response.status === 401 || response.status === 403){
                        // Go login failed...
                    }
                    return $q.reject(response);
                }

            };
        }]);
        //$locationProvider.html5Mode(true);
    }])

    .run(['$http', '$rootScope', '$location', 'authService', 'jwtHelper', 'AuthStore',
        function ($http, $rootScope, $location, authService, jwtHelper, AuthStore) {

            // @deprecated and should be changed
            $rootScope.goTo = function (route, params) {        // Global function for changing view
                var searchParams = params || {};
                return $location.path(route).search(searchParams);
            };


            authService.getCSRF().then(function (token) {       // Add CSRF token to header
                $http.defaults.headers.common['x-csrf-token'] = token;

                // The token should be refreshed each time the user opens the app
                var token = AuthStore.get('jwt');

                if(token === null){
                    // No token exist...
                }else{
                    if(jwtHelper.isTokenExpired(token)) {       // Token is expired
                        // todo: go to login
                    }else{                                      // Token is valid. Refresh token and continue
                        authService.refreshToken()
                            .then(function (res) {
                                console.log("token refreshed");

                                jwtHelper.decodeToken(res.token);
                            }, function (err) {
                                console.log(err);
                                console.log("Could not reach server");
                            });
                    }
                }
            });

            $rootScope.$on('$routeChangeStart', function (event, to, from) {

            });
        }
    ])

    .factory('AuthStore', ['store', function (store) {
        return store.getNamespacedStore('authStorage');
    }]);