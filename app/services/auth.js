angular.module('myApp').factory('authService', ['$http', 'config', '$q',

    function($http, config, $q) {

        return {

            login: function(username, password) {

                var defer = $q.defer();

                $http({
                    method: 'POST',
                    url: config.baseUrl + 'auth/login',
                    data: $.param({
                        username: username,
                        password: password
                    })
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
                    data: $.param({
                        username: username,
                        password: password
                    })
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
                    data: $.param({
                        email: email
                    })
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
