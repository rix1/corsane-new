angular.module('myApp.services')
    .factory('feedService', ['$http', 'config', '$q',

        function($http, config, $q) {

            return {

                getFeed: function() {

                    var defer = $q.defer();

                    $http.get(config.baseUrl + '/feed')
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
