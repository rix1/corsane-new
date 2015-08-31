'use strict';

angular.module('myApp.article', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/article/create', {
            templateUrl: 'views/article/newArticle.html',
            controller: 'newArticleCtrl'
        })
            .when('/article/:id', {
            templateUrl: 'views/article/article.html',
            controller: 'articleCtrl'
        })
            .when('/article/:id/edit', {
            templateUrl: 'views/article/newArticle.html',
            controller: 'editArticleCtrl'
        });
    }])

    .controller('articleCtrl', ['$rootScope', '$scope', '$routeParams', 'articleService', function ($rootScope, $scope, $routeParams, articleService) {
        var articleId = $routeParams.id;
        $scope.article = {};

        articleService.getArticle(articleId).then(
            function (article) {
                $scope.article = article;
                if(article.author.id === $rootScope.user.id){
                    $rootScope.goTo('/article/' + articleId + '/edit');
                }
            },
            function (err) {
                console.log(err);
            }
        );
    }])



// =================================================================== // WORK BELOW THIS LINE ===================================================================


    .controller('editArticleCtrl', ['$rootScope', '$scope', '$routeParams', 'articleService', 'topicService', 'paragraphService',  function ($rootScope, $scope, $routeParams, articleService, topicService, paragraphService) {
        var articleId = $routeParams.id;

        $scope.topicLookup = {};

        $scope.article = {
            header: {
                title: '',
                introduction: '',
                id: '',
                topics: {},
                author: {},
                published: true,
                featured: true,
                approved: true
            },
            paragraphs: [],
            state: {}
        };


        articleService.getArticle(articleId).then(
            function (res) {
                console.log(res);

                if(res.author.id === $rootScope.user.id){

                    $scope.article.header.title = res.title;
                    $scope.article.header.introduction = res.introduction;
                    $scope.articleId = res.id;
                    $scope.article.header.topics = res.topics[0];
                    $scope.article.header.author = res.author;
                    $scope.article.header.published = res.published;
                    $scope.article.header.featured = res.featured;
                    $scope.article.header.approved = res.approved;

                    $scope.article.paragraphs = res.paragraphs;
                }else{
                    $rootScope.goTo('/article/')
                }
            },
            function (err) {
                console.log(err);
            }
        );


        var createLookup = function () {
            // Genious lookup object <-- THIS REALLY IS THE SHIT (Biased source)
            for(var i = 0; i < $scope.topics.length; i++) {
                $scope.topicLookup[$scope.topics[i].id] = $scope.topics[i];
            }
        };

        /**
         * Service functions
         * Functions passing data to the API through Angular services
         * **/

            // CREATE ARTICLE
        topicService.getAllTopics().then(
            function (res) {
                $scope.topics = res;
                createLookup();
            }, function (err) {
                console.log(err);
            });

        /**
         * Currently we're saving the article when the first paragraph is added,
         * and when the Save button is pressed. In the future this should be changed with a
         * redirect.
         * TODO: Create article when URL is visited.
         * */

        $scope.newParagraph = function () {
            if($scope.article.paragraphs.length<1) {
                if(validateHeader()){
                    addArticle($scope.article.header);
                    addBlank();
                }else{
                    $scope.helptext = headerError;
                }
            }else {
                addBlank();
            }
        };

        var validateHeader = function () {
            return !!($scope.article.header.title && $scope.article.header.introduction && $scope.article.header.topics);
        };


        /**
         * Remove blank paragraph's and test length
         * @return boolean if there is more than one not blank paragraph
         * */
        var stripParagraphs = function () {
            for(var i = 0; i < $scope.article.paragraphs.length; i++) {

                var title = $scope.article.paragraphs[i].headline.length === 0;
                var text = $scope.article.paragraphs[i].text.length === 0;

                if(title && text) {
                    $scope.article.paragraphs.splice(i, 1); // Delete empty elements...
                }
                if(title || text) {
                    return false;
                }
            }
            return true;
        };

        var addBlank = function () {
            $scope.article.paragraphs.push({
                headline: '',
                text: ''
            });
        };

        $scope.delete = function (paragraph) {
            var index = $scope.article.paragraphs.indexOf(paragraph);
            deleteParagraph(paragraph);
            $scope.article.paragraphs.splice(index, 1);

        };


        $scope.save = function () {

            //console.log($scope.article);

            $scope.article.state.timestamp = Date.now();
            $scope.article.state.saved = true;

            stripParagraphs();
            if(validateHeader()) {
                addArticle($scope.article.header);
                addParagraphs($scope.article.paragraphs);
            }
            // else console.log("header not validated");
        };

        // CREATE ARTICLE
        var addArticle = function (articleData) {

            console.log("updating article");
            console.log(articleData);

            var updateData = {
                id: $scope.articleId,
                title: articleData.title,
                introduction: articleData.introduction
            };

            articleService.updateArticle(updateData)
                .then(function (res) {
                    console.log("article updated");
                }, function (err) {
                    console.log(err);
                });
            //console.log("something lets update");
        };

        // EDIT ARTICLE
        var addParagraphs = function (paragraphs) {
            var paragraphData;
            for (var i = 0; i < paragraphs.length; i++) {
                paragraphData = paragraphs[i];
                if (paragraphData.changed) {
                    console.log("saving changed paragraph");
                    addParagraph(paragraphData);
                    paragraphData.changed = false;
                }else{
                    console.log("nothing changed");
                }
            }
        };

        // EDIT ARTICLE
        var deleteParagraph = function (paragraph) {
            var formData = {
                article: $scope.articleId,
                headline: paragraph.headline,
                text: paragraph.text
            };

            if(paragraph.id) {
                formData.id = paragraph.id;

                paragraphService.deleteParagraph(formData)
                    .then(function (res) {
                        //console.log("paragraph deleted");
                    }, function (err) {
                        console.log(err);
                    });
            }else{
                //console.log("WOWA you mustnt do that");
            }
        };

        // EDIT ARTICLE
        var addParagraph = function (paragraphData) {
            var formData = {
                article: $scope.articleId,
                headline: paragraphData.headline,
                text: paragraphData.text
            };

            if(paragraphData.id){
                formData.id = paragraphData.id;

                paragraphService.updateParagraph(formData)
                    .then(function (res) {
                        console.log("paragraph updated");
                        console.log(res);
                    }, function (err) {
                        console.log(err);
                    });
            }else{
                paragraphService.createParagraph(formData)
                    .then(function (res) {
                        console.log("paragraph created: check ID");
                        paragraphData.id = res.id;
                        //console.log(paragraphData);
                    }, function (err) {
                        console.log(err);
                    });
            }
        };
    }])

/**
 * "FOR THE WATCH"
 *
 * */
    .controller('tissCtrl', ['$scope', function ($scope) {
        $scope.$watch('paragraph', function (newVal, oldVal) {
            if(angular.isUndefined(newVal.changed)){
                newVal.changed = false;
            }else if(!newVal.changed){
                // Angular $watch loooves to run so we have to check if the values ACTUALLY changed.
                newVal.changed = !((oldVal.headline === newVal.headline) && (oldVal.text === newVal.text));
            }
        }, true);
    }])

    .controller('newArticleCtrl', ['$scope', '$rootScope', 'topicService', 'articleService','paragraphService', function ($scope, $rootScope, topicService, articleService, paragraphService) {

        $scope.signedIn = false;
        $scope.helptext = '';
        $scope.topicLookup = {};

        var headerError = 'Please fill inn Title, Description and Topic before continuing...';
        var article = $scope.article;

        if($rootScope.user){
            $scope.signedIn = true;
            article.header.author = $rootScope.user.id;
        }else{
            // TODO: Tell user to sign in through modal or something
        }
    }]);



