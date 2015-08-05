angular.module('myApp.services')
    .factory('authService', ['$http', 'config', '$q', '$localStorage',
        function($http, config, $q, $localStorage) {

            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                return window.atob(output);
            }

            // Reconstruct userObject from token
            function getClaimsFromToken() {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    var encoded = token.split('.')[1];
                    user = JSON.parse(urlBase64Decode(encoded));
                }
                //console.log("wow -  something:");
                //console.log(user);
                return user;
            }

            var tokenClaims = getClaimsFromToken();

            var transformReq = function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            };

            return {

                login: function (username, password) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'auth/login',
                        transformRequest: transformReq,
                        data: {
                            username: username,
                            password: password
                        }
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;

                },

                loginWithFacebook: function () {
                    // Redirect to backend login
                    window.location.href = config.baseUrl + 'auth/facebook/login';
                },

                logout: function () {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'auth/logout'
                    }).success(function (res) {
                        tokenClaims = {};
                        delete $localStorage.token;
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        var error = {};
                        error.message = "Wops - validation error. Try again!";
                        defer.reject(error)
                    });

                    return defer.promise;
                },

                register: function (first, last, username, password) {

                    console.log(username);
                    console.log(password);

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'user',
                        transformRequest: transformReq,
                        data: {
                            first_name: first,
                            last_name: last,
                            username: username,
                            password: password
                        }
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        var error = {};
                        error.message = "Wops - validation error. Try again!";
                        defer.reject(error)
                    });

                    return defer.promise;
                },

                forgotten_password: function (email) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'auth/forgotten_password',
                        transformRequest: transformReq(),
                        data: {
                            username: email
                        }
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;

                },

                getCSRF: function () {

                    var q = $q.defer();

                    $http({
                        method: 'GET',
                        url: config.baseUrl + 'csrfToken',
                        withCredentials: true
                    }).success(function (data) {
                        q.resolve(data._csrf);
                    }).error(function (err) {
                        q.reject(err);
                    });

                    return q.promise;
                },

                getTokenClaims: function () {
                    return tokenClaims;
                }
            };
        }
    ]);
