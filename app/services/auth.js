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
                        tokenClaims = {};
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
                }
            };
        }
    ]);
