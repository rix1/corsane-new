angular.module('myApp.services')
    .factory('articleService', ['$http', 'config', '$q',

    function($http, config, $q) {

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
                    data: $.param({
                        title: article.title,
                        topic: article.topic
                    })
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
