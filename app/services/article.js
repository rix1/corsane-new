angular.module('myApp.services')
    .factory('articleService', ['$http', 'config', '$q', 'apiService',

        function($http, config, $q, apiService) {

            return {

                getArticle: function(id) {
                    var defer = $q.defer();
                    $http.get(config.baseUrl + '/article/' + id)
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

                    $http.get(config.baseUrl + '/article/')
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
                        url: config.baseUrl + '/article',
                        transformRequest: apiService.transformRequest,
                        data: article
                    }).success(function(res) {
                        defer.resolve(res);
                    }).error(function(err, data, status, config) {
                        defer.reject(err)
                    });

                    return defer.promise;
                },

                updateArticle: function(article){
                    var defer = $q.defer();

                    var id = article.id;
                    delete article.id;

                    $http({
                        method: 'PUT',
                        url: config.baseUrl + '/article/' + id,
                        transformRequest: apiService.transformRequest,
                        data: article
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status,config) {
                        defer.reject(err);
                    });
                    return defer.promise;
                },

                deleteArticle: function(article){
                    var defer = $q.defer();

                    $http({
                        method: 'DELETE',
                        url: config.baseUrl + '/article/' + article.id,
                        transformRequest: apiService.transformRequest,
                    }).success(function (res) {
                        defer.resolve(res);
                    }).error(function (err, data, status,config) {
                        defer.reject(err);
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