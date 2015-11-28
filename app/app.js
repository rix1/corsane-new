'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    //'ngRoute',
    //'ngStorage',
    'ui.router',
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

    .config(['$httpProvider', '$urlRouterProvider', 'jwtInterceptorProvider', function ($httpProvider, $urlRouterProvider, jwtInterceptorProvider) {
        //$routeProvider.otherwise({redirectTo: '/'});
        $urlRouterProvider.otherwise('welcome');

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfHeaderName = 'x-csrf-token';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        jwtInterceptorProvider.tokenGetter = ['AuthStore', function (AuthStore) {
            return AuthStore.get('jwt');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');


        $httpProvider.interceptors.push(['$q', function ($q) {
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

    .run(['$http', '$rootScope', '$state', 'authService', 'jwtHelper', 'AuthStore',
        function ($http, $rootScope, $state, authService, jwtHelper, AuthStore) {

            // @deprecated and should be changed
            $rootScope.goTo = function (route, params) {        // Global function for changing view
                console.log("@deprecated goTo: HVEM KALLER MEG?? " + route);
                //var searchParams = params || {};
                //return $location.path(route).search(searchParams);
                //return $state.go('feilURLnavn!');
            };


            authService.getCSRF().then(function (token) {       // Add CSRF token to header
                $http.defaults.headers.common['x-csrf-token'] = token;

                // The token should be refreshed each time the user opens the app
                var token = AuthStore.get('jwt');

                if(token === null){
                    // No token exist...
                }else{
                    if(jwtHelper.isTokenExpired(token)) {       // Token is expired.
                        AuthStore.remove('jwt');
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
            $rootScope.$on('$stateChangeStart', function (event, to, from) {
                console.log("APP.js: trying to change state");
            });

            // somewhere else
            $rootScope.$on('$stateNotFound',
                function (event, unfoundState, fromState, fromParams) {
                    console.log(unfoundState.to); // "lazy.state"
                    console.log(unfoundState.toParams); // {a:1, b:2}
                    console.log(unfoundState.options); // {inherit:false} + default options
                });
        }
    ])

    .factory('AuthStore', ['store', function (store) {
        return store.getNamespacedStore('authStorage');
    }]);