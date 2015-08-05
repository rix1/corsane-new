'use strict';

angular.module('myApp.lab', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/lab', {
            templateUrl: 'views/lab/lab.html',
            controller: 'labCtrl'
        });
    }])

    .controller('labCtrl', ['$scope', 'topicService','articleService', 'paragraphService', function($scope, topicService, articleService, paragraphService) {
        $scope.addTopic = function (topic) {
            var formdata = {
                title: topic.title,
                description: topic.description
            };

            topicService.addTopic(formdata)
                .then(function (res) {
                    $scope.topic.res = res.id;
                }, function (err) {
                    console.log(err);
                });
        };


        $scope.addArticle = function (article) {
            var formdata = {
                title: article.title,
                introduction: article.introduction,
                topics: article.topic,
                published: true,
                featured: true,
                approved: true
            };

            articleService.createArticle(formdata)
                .then(function (res) {
                    $scope.article.res = res.id;
                }, function (err) {
                    console.log(err);
                });
        };

        $scope.addParagraph = function (paragraph) {
            var formdata = {
                article: paragraph.article,
                headline: paragraph.headline,
                text: paragraph.text
            };

            paragraphService.createParagraph(formdata)
                .then(function (res) {
                    $scope.paragraph.res = res.id;
                }, function (err) {
                    console.log(err);
                });
        };
    }]);