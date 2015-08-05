angular.module('myApp.services')
    .factory('paragraphService', ['$http', 'config', '$q',

        function($http, config, $q) {

            // TODO: WARNING DRYYYYY
            var transformReq = function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            };


            return {
                getParagraph: function(id) {

                    var defer = $q.defer();

                    $http.get(config.baseUrl + 'paragraph/' + id)
                        .success(function(res) {
                            defer.resolve(res);
                        })
                        .error(function(err, status) {
                            defer.reject(err)
                        });

                    return defer.promise;
                },

                getAllParagraphs: function() {

                    var defer = $q.defer();

                    $http.get(config.baseUrl + 'paragraph/')
                        .success(function(res) {
                            defer.resolve(res);
                        })
                        .error(function(err, status) {
                            defer.reject(err)
                        });

                    return defer.promise;
                },

                createParagraph: function(paragraph) {
                    var defer = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.baseUrl + 'paragraph',
                        transformRequest: transformReq,
                        data: paragraph
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
