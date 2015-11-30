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

    .config(['$httpProvider', '$urlRouterProvider', 'jwtInterceptorProvider',
        function ($httpProvider, $urlRouterProvider, jwtInterceptorProvider) {
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
                        //console.log("Response error: " + response.status);
                        //console.log(response);

                        if(response.status === 401 || response.status === 403){
                            // Go login failed...
                        }
                        return $q.reject(response);
                    }

                };
            }]);
            //$locationProvider.html5Mode(true);
        }])

    .run(['$http', '$rootScope', '$state', 'authService', 'jwtHelper', 'AuthStore', 'userService',
        function ($http, $rootScope, $state, authService, jwtHelper, AuthStore, User) {

            authService.getCSRF().then(function (token) {       // Add CSRF token to header
                $http.defaults.headers.common['x-csrf-token'] = token;

                //console.log(token);

                // The token should be refreshed each time the user opens the app
                var token = AuthStore.get('jwt');

                if(!token){                                     // No token exist...

                }else{
                    if(jwtHelper.isTokenExpired(token)) {       // Token is expired.
                        AuthStore.remove('jwt');
                        User.currentUser().setAuthenticated(false); // This should maybe be done in service?
                        $state.go('login');
                    }else{                                      // Token is valid. Refresh token and continue
                        authService.refreshToken()
                            .then(function (res) {
                                //console.log("token refreshed");
                                jwtHelper.decodeToken(res.token);
                            }, function (err) {
                                //console.log(err);
                                //console.log("Could not reach server");
                            });
                    }
                }

            });
            $rootScope.$on('$stateChangeStart', function (event, to, from) {

                //console.log("==== ROUTE IS CHANGING FROM: ");
                //console.log(from);
                //console.log(to);
                //console.log("==== ROUTE HAS CHANGED: ");

                var requireLogin = to.data.login;
                var admin = to.data.admin;

                var userAuth = User.currentUser().isAuthenticated();
                var userAdmin = userAuth ? User.currentUser().getUser().is_admin:false;

                if(userAuth){
                    //$urlRouterProvider.otherwise('feed');
                }

                if(requireLogin && !userAuth){
                    event.preventDefault();
                    //event.preventDefault();
                    // Redirect to login
                    $state.go('login');
                }

                if(admin && !userAdmin){
                    //console.log("NO PERMISSION HERE");
                    event.preventDefault();
                }
            });
        }
    ])

    .factory('AuthStore', ['store', function (store) {
        return store.getNamespacedStore('authStorage');
    }]);