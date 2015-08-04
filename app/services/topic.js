angular.module('myApp.services')
    .factory('topicService', ['$http', 'config', '$q',

    function($http, config, $q) {

        return {

            getTopic: function(id) {

                var defer = $q.defer();

                $http.get(config.baseUrl + 'topic/' + id)
                    .success(function(res) {
                        defer.resolve(res);
                    })
                    .error(function(err, status) {
                        defer.reject(err)
                    });

                return defer.promise;
            },

            getAllTopics: function() {

                var defer = $q.defer();

                $http.get(config.baseUrl + 'topic/')
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
