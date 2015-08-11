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
        var first = true;
        $scope.signedIn = false;

        $scope.helptext = '';

        $scope.article = {
            title: '',
            introduction: '',
            topics: '',
            published: false,
            featured: false,
            approved: false
        };

        var paragraph = {
            article: '',
            headline: '',
            text: ''
        };

        $scope.$watch(function ($scope) {
            return $scope.article.title;
        }, function (newval, oldval) {
            console.log(newval);
            console.log(oldval);
        });

        $scope.content = [];
        console.log($rootScope.user);


        if($rootScope.user){
            $scope.signedIn = true;
            $scope.article.author = $rootScope.user.id;
        }

        $scope.addParagraph = function (test) {
            console.log(test);
            var a = $scope.article;

            //console.log($scope.article);
            if(!$scope.signedIn) {
                $scope.helptext = 'Please sign in to create a new article';
            }else if((a.title && a.introduction && a.topics)){
                $scope.helptext = 'Please fill inn Title, Description and Topic before continuing...';
            }else{
                if(first){
                    // TODO: Add article to API and set articleID
                    first = false;
                }
                $scope.content.push(paragraph);
            }
        };
    }]);