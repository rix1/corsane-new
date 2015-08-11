'use strict';

angular.module('myApp.article', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/article/:id', {
            templateUrl: 'views/article/article.html',
            controller: 'articleCtrl'
        }).when('/new/article/', {
            templateUrl: 'views/article/newArticle.html',
            controller: 'newArticleCtrl'
        });
    }])

    .controller('articleCtrl', ['$scope', '$routeParams', 'articleService', function ($scope, $routeParams, articleService) {
        var articleId = $routeParams.id;

        console.log(articleId);

        articleService.getArticle(articleId).then(
            function (article) {
                console.log(article);
                $scope.article = article;
            },
            function (err) {
                console.log(err);
            }
        );
    }])


    .controller('newArticleCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        if($rootScope.user){
            $scope.signedIn = true;
        }
        console.log("create new article naow");
    }]);