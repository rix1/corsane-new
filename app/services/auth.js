angular.module('myApp.services')
    .factory('authService', ['$http', 'config', '$q',
        function($http, config, $q) {

            var transformReq = function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            };

            return {

                login: function(username, password) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'auth/login',
                        transformRequest: transformReq(),
                        data: {
                            username: username,
                            password: password
                        }
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;

                },

                loginWithFacebook: function() {
                    // Redirect to backend login
                    window.location.href = config.baseUrl + 'auth/facebook/login';
                },

                logout: function() {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'auth/logout'
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                register: function(username, password) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'user',
                        transformRequest: transformReq(),
                        data: {
                            username: username,
                            password: password
                        }
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                forgotten_password: function(email) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'auth/forgotten_password',
                        transformRequest: transformReq(),
                        data: {
                            username: email
                        }
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;

                },

                getCSRF: function() {

                    var q = $q.defer();

                    $http({
                        method: 'GET',
                        url: config.baseUrl + 'csrfToken',
                        withCredentials: true
                    }).success(function(data) {
                        q.resolve(data._csrf);
                    }).error(function(err) {
                        q.reject(err);
                    });

                    return q.promise;
                }

            }
        }
    ]);
