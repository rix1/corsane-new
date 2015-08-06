angular.module('myApp.services')
    .factory('articleService', ['$http', 'config', '$q', 'apiService',

    function($http, config, $q, apiService) {

        return {

            getArticle: function(id) {

                var defer = $q.defer();

                $http.get(config.baseUrl + 'article/' + id)
                    .success(function(res) {
                        defer.resolve(res);
                    })
                    .error(function(err, status) {
                        defer.reject(err)
                    });

                return defer.promise;
            },

            getAllArticles: function() {

                var defer = $q.defer();

                $http.get(config.baseUrl + 'article/')
                    .success(function(res) {
                        defer.resolve(res);
                    })
                    .error(function(err, status) {
                        defer.reject(err)
                    });

                return defer.promise;
            },

            createArticle: function(article) {
                var defer = $q.defer();

                $http({
                    method: 'POST',
                    url: config.baseUrl + 'article',
                    transformRequest: apiService.transformRequest,
                    data: article
                }).success(function(res) {
                    defer.resolve(res);
                }).error(function(err, data, status, config) {
                    defer.reject(err)
                });

                return defer.promise;
            },

            addIntroduction: function(id, introduction) {

            },

            addBackgroundImage: function(id, image) {

            },

            editTitle: function(newTitle) {

            }


        }
    }
]);
