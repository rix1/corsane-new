angular.module('corsaneApp').factory('userService', ['$http', 'config', '$q',
    function($http, config, $q) {

        return {

            getUser: function(id) {

                var defer = $q.defer();

                $http.get(config.baseUrl + 'user/' + id)
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
                    url: config.baseUrl + 'user/' + id + '/unfollow'
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
                    url: config.baseUrl + 'auth/change_password',
                    data: $.param({
                        password: newpass
                    })
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
