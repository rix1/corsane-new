angular.module('myApp.services')
    .factory('authService', ['$http', 'config', '$q', '$rootScope', 'apiService', 'AuthStore', 'userService', 'jwtHelper',
        function($http, config, $q, $rootScope, apiService, AuthStore, User, jwtHelper) {

            return {

                login: function (userCredentials) {
                    var defer = $q.defer();
                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/auth/login',
                        transformRequest: apiService.transformRequest,
                        data: userCredentials
                    }).success(function (res) {
                        console.log("login: ");
                        console.log(res);
                        User.currentUser().setAuthenticated(true);
                        User.currentUser().setUser(jwtHelper.decodeToken(res.token));
                        AuthStore.set('jwt', res.token);                    // Save userToken

                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        console.log("login error: ");
                        console.log(err);
                        console.log(data);

                        defer.reject(err);
                    });
                    return defer.promise;
                },

                loginWithFacebook: function () {
                    // Redirect to backend login
                    window.location.href = config.baseUrl + '/auth/facebook/login';
                },

                logout: function () {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/auth/logout'
                    }).success(function (res) {

                        User.currentUser().setAuthenticated(false);
                        User.currentUser().setUser(null);
                        AuthStore.remove('jwt');

                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        //var error = {};
                        //console.log(err);
                        //error.message = "Wops - validation error. Try again!";
                        defer.reject(err)
                    });
                    return defer.promise;
                },

                getCSRF: function () {
                    var q = $q.defer();

                    $http({
                        method: 'GET',
                        url: config.baseUrl + '/csrfToken',
                        withCredentials: true
                    }).success(function (data) {
                        console.log("csrf token");
                        console.log(data);
                        q.resolve(data._csrf);
                    }).error(function (err) {
                        q.reject(err);
                    });
                    return q.promise;
                },


                refreshToken: function() {
                    var q = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/refresh_token'
                    }).success(function (res) {

                        User.currentUser().setUser(jwtHelper.decodeToken(res.token));
                        User.currentUser().setAuthenticated(true);
                        AuthStore.set('jwt', res.token);

                        q.resolve(res);
                    }).error(function (err) {
                        q.reject(err);
                    });
                    return q.promise;
                }
            };
        }
    ]);