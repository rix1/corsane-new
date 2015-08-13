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
        $scope.content = {};
        $scope.helptext = '';
        $scope.para = {};
        $scope.addNew = false;

        $scope.article = {
            title: '',
            introduction: '',
            topics: '',
            published: false,
            featured: false,
            approved: false
        };

        if($rootScope.user){
            $scope.signedIn = true;
            $scope.article.author = $rootScope.user.id;
        }

        $scope.$watch('content', function (neu, old) {
            console.log(neu);
            console.log(old);
        });

        $scope.click = function () {
            var paragraph = {
                headline: '',
                text: ''
            };
            $scope.content.push(paragraph);
        };

        $scope.save = function () {
            console.log($scope.content);
        };
/*
        $scope.click = function () {
            if(!$scope.addNew){
                // First time... TODO: Save article and receive ID.
                $scope.addNew = true;
            }else{
                // Add new paragraph to the content array
                var newElement = {
                    headline: $scope.para.headline,
                    text: $scope.para.text
                };

                $scope.content.push(newElement);
                $scope.para.reset();
            }
            console.log($scope.content);
        };
*/

        $scope.para.reset = function () {
            $scope.para.headline = '';
            $scope.para.text = '';
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