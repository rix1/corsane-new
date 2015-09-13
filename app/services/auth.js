angular.module('myApp.services')
    .factory('authService', ['$http', 'config', '$q', '$localStorage', '$rootScope', 'apiService',
        function($http, config, $q, $localStorage, $rootScope, apiService) {

            return {
                login: function (userCredentials) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/auth/login',
                        transformRequest: apiService.transformRequest,
                        data: userCredentials
                    }).success(function (res) {
                        $localStorage.token = res.token;
                        $rootScope.user = apiService.getClaimsFromToken();
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
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
                        $rootScope.user = {};
                        delete $localStorage.token;
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        var error = {};
                        error.message = "Wops - validation error. Try again!";
                        defer.reject(error)
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
                        $localStorage.token = res.token;
                        $rootScope.user = apiService.getClaimsFromToken();
                        q.resolve(res);
                    }).error(function (err) {
                        q.reject(err);
                    });
                    return q.promise;
                },

                getTokenExpirationDate: function (decodedToken) {

                    if (typeof decodedToken.exp === "undefined") {
                        return null;
                    }

                    var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
                    d.setUTCSeconds(decodedToken.exp);

                    return d;
                },

                isTokenExpired: function (token) {
                    if(!token) return true;

                    var d = this.getTokenExpirationDate(token);

                    if (d === null)
                        return false;

                    // Token expired?
                    return !(d.valueOf() > new Date().valueOf());
                }

            };
        }
    ]);
