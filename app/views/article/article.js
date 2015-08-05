'use strict';

angular.module('myApp.article', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/article/:id', {
            templateUrl: 'views/article/article.html',
            controller: 'articleCtrl'
        });
    }])

    .controller('articleCtrl', ['$scope', '$routeParams', 'articleService', function($scope, $routeParams, articleService) {

        var articleId = $routeParams.id;
        articleService.getArticle(articleId).then(
            function(article) {
                $scope.article = article;
            },
            function(err) {
                console.log(err);
            }
        );
    }]);