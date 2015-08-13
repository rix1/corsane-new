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


    .controller('newArticleCtrl', ['$scope', '$rootScope', 'topicService', function ($scope, $rootScope, topicService) {
        var first = true;
        $scope.signedIn = false;
        $scope.content = [];
        var con = [];
        $scope.helptext = '';
        $scope.newParagraph = {};
        $scope.para = {};

        $scope.article = {
            title: '',
            introduction: '',
            topics: '',
            published: false,
            featured: false,
            approved: false
        };

        var paragraph = {
            headline: '',
            text: ''
        };


        if($rootScope.user){
            $scope.signedIn = true;
            $scope.article.author = $rootScope.user.id;
        }

        $scope.click = function (par) {
            console.log(par);
            if($scope.content.length < 1){
                $scope.content.push(paragraph);
            }else{
                $scope.para = {};
                con.push(par);
                $scope.content = con.reverse(); // <---- LAST: TRIED REVERSING....

            }
            console.log($scope.content);
        };


        $scope.submit = function () {
            console.log($scope.article);
            console.log($scope.content);

            var a = $scope.article;

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

        /**
         * Service functions
         * Functions passing data to the API through Angular services
         * **/

        topicService.getAllTopics().then(
            function (res) {
                $scope.topics = res;
            }, function (err) {
                console.log(err);
            });
    }]);