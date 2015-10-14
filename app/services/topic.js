angular.module('myApp.services')
.factory('topicService', ['$http', 'config', '$q', 'apiService',

    function($http, config, $q, apiService) {

        return {

            getTopic: function(id) {

                var defer = $q.defer();

                $http.get(config.baseUrl + '/topic/' + id)
                .success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err)
                });

                return defer.promise;
            },

            addTopic: function(formdata) {

                var defer = $q.defer();

                $http({
                    method: 'POST',
                    url: config.baseUrl + '/topic',
                    transformRequest: apiService.transformRequest,
                    data: formdata
                }).success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err)
                });
                return defer.promise;
            },

            updateTopic: function(formdata) {

                var id = formdata.id;
                delete formdata.id;

                var defer = $q.defer();

                $http({
                    method: 'PUT',
                    url: config.baseUrl + '/topic/' + id,
                    transformRequest: apiService.transformRequest,
                    data: formdata
                }).success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err)
                });
                return defer.promise;
            },

            deleteTopic: function(formdata) {

                var defer = $q.defer();

                $http({
                    method: 'DELETE',
                    url: config.baseUrl + '/topic/' + formdata.id,
                    transformRequest: apiService.transformRequest,
                }).success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err)
                });
                return defer.promise;
            },

            getAllTopics: function() {

                var defer = $q.defer();

                $http.get(config.baseUrl + '/topic')
                .success(function(res) {
                    defer.resolve(res);
                })
                .error(function(err, status) {
                    defer.reject(err)
                });

                return defer.promise;
            }

        }
    }
    ]);
