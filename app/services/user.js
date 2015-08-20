angular.module('myApp.services')
    .factory('userService', ['$http', 'config', '$q', 'apiService',

        function($http, config, $q, apiService) {

            return {

                register: function (user) {
                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/user',
                        transformRequest: apiService.transformRequest,
                        data: user
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        var error = {};
                        console.log(err);
                        error.message = "Wops - validation error. Try again!";
                        defer.reject(error)
                    });

                    return defer.promise;
                },

                forgotten_password: function (email) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/auth/forgotten_password',
                        transformRequest: apiService.transformRequest,
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

                getUser: function(id) {

                    var defer = $q.defer();

                    $http.get(config.baseUrl + '/user/' + id)
                        .success(function(res) {
                            defer.resolve(res);
                        })
                        .error(function(err, status) {
                            defer.reject(err)
                        });

                    return defer.promise;
                },


                follow: function(id) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'user/' + id + '/follow'
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                unfollow: function(id) {
                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/user/' + id + '/unfollow'
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                change_password: function(newpass) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/auth/change_password',
                        transformRequest: apiService.transformRequest,
                        data: {
                            password: newpass
                        }
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                }
            }
        }
    ]);
