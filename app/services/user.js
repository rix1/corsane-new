angular.module('myApp.services')
    .factory('userService', ['$http', 'config', '$q', 'apiService', 'AuthStore', 'jwtHelper',
        function($http, config, $q, apiService, AuthStore, jwtHelper) {

            var localUser = {};
            var token = AuthStore.get('jwt');
            if(!token){
                localUser.authenticated = false;
                localUser.userObject = null;
            }else{
                localUser.authenticated = true;
                localUser.userObject = jwtHelper.decodeToken(token);
            }

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

                // Return original error message if it did not match any of the errors above
                return {message: err};
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

                reset_password: function (email) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/auth/forgotten_password',
                        transformRequest: apiService.transformRequest,
                        data: email
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        var errorMessage = getErrorMessage(err);
                        defer.reject(errorMessage);
                    });

                    return defer.promise;

                },

                currentUser: function () {
                    return {
                        getUser: function () {
                            return localUser.userObject;
                        },

                        setUser: function (user) {
                            localUser.userObject = user;
                        },

                        setAuthenticated: function (bool) {
                            localUser.authenticated = bool;
                        },

                        isAuthenticated: function () {
                            return localUser.authenticated;
                        }
                    };
                },

                // GET any userObject from the server.
                getUser: function (id) {
                    var defer = $q.defer();

                    $http.get(config.baseUrl + '/user/' + id)
                        .success(function (res) {

                            localUser.userObject = res;
                            defer.resolve(res);
                        })
                        .error(function (err, status) {
                            defer.reject(err)
                        });
                    return defer.promise;
                },

                follow: function (id) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'user/' + id + '/follow'
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                unfollow: function (id) {
                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/user/' + id + '/unfollow'
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                change_password: function (newpass) {

                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + '/auth/change_password',
                        transformRequest: apiService.transformRequest,
                        data: {
                            password: newpass
                        }
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                deleteAccount: function (id) {
                    var defer = $q.defer();

                    $http({
                        method: 'DELETE',
                        url: config.baseUrl + '/user/' + id,
                        transformRequest: apiService.transformRequest
                    }).success(function (res) {

                        // The user is deleted. We should log out
                        this.currentUser().setUser(null);
                        AuthStore.remove('jwt');

                        defer.resolve(res);
                    }).error(function (err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                }
            };
        }
    ]);
