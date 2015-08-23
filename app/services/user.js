angular.module('myApp.services')
    .factory('userService', ['$http', 'config', '$q', 'apiService',
        function($http, config, $q, apiService) {

            function getErrorMessage(err) {
                if(err.invalidAttributes) {

                    // password errors
                    if(err.invalidAttributes.password) {
                        if(err.invalidAttributes.password[0].rule === 'required')
                            return {message: 'Password is required'};

                        else if(err.invalidAttributes.password[0].rule === 'minLength')
                            return {message: 'Password too short. Must be minimal 6 characters long'};
                    }

                    // username errors
                    else if(err.invalidAttributes.username) {

                        if(err.invalidAttributes.username[0].rule === 'unique')
                            return {message: 'Email address already exists'};

                        else if(err.invalidAttributes.username[0].rule === 'required')
                            return {message: 'Email is required'};
                    }
                }
                else {

                    return {message: err};
                }
            }

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
                        var errorMessage = getErrorMessage(err);
                        defer.reject(errorMessage);
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
