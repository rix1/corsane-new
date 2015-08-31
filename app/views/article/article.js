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

    .controller('articleCtrl', ['$rootScope', '$scope', '$routeParams', 'articleService', function ($rootScope, $scope, $routeParams, articleService) {
        var articleId = $routeParams.id;
        $scope.article = {};

        articleService.getArticle(articleId).then(
            function (article) {
                $scope.article = article;
                if(article.author.id === $rootscope.user.id){
                    console.log("DU EGER");
                }
            },
            function (err) {
                console.log(err);
            }
        );
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

        $scope.article = {
            header: {
                title: '',
                introduction: '',
                topics: '',
                author: '',
                published: true,
                featured: true,
                approved: true
            },
            paragraphs: [],
            state: {}
        };

        var headerError = 'Please fill inn Title, Description and Topic before continuing...';
        var article = $scope.article;

        if($rootScope.user){
            $scope.signedIn = true;
            article.header.author = $rootScope.user.id;
        }else{
            // TODO: Tell user to sign in through modal or something
        }


        /**
         * Currently we're saving the article when the first paragraph is added,
         * and when the Save button is pressed. In the future this should be changed with a
         * redirect.
         * TODO: Create article when URL is visited.
         * */

        $scope.newParagraph = function () {
            if(!$scope.signedIn) {
                $scope.helptext = 'Please sign in to create a new article.';
            }else if(article.paragraphs.length<1) {
                if(validateHeader()){
                    addArticle(article.header);
                    addBlank();
                }else{
                    $scope.helptext = headerError;
                }
            }else {
                addBlank();
            }
        };

        var validateHeader = function () {
            return !!(article.header.title && article.header.introduction && article.header.topics);
        };


        /**
         * Remove blank paragraph's and test length
         * @return boolean if there is more than one not blank paragraph
         * */
        var stripParagraphs = function () {
            for(var i = 0; i < article.paragraphs.length; i++) {

                var title = article.paragraphs[i].headline.length === 0;
                var text = article.paragraphs[i].text.length === 0;

                if(title && text) {
                    article.paragraphs.splice(i, 1); // Delete empty elements...
                }
                if(title || text) {
                    return false;
                }
            }
            return true;
        };

        var addBlank = function () {
            article.paragraphs.push({
                headline: '',
                text: ''
            });
        };

        $scope.delete = function (paragraph) {
            var index = article.paragraphs.indexOf(paragraph);
            deleteParagraph(paragraph);
            article.paragraphs.splice(index, 1);

        };


        $scope.save = function () {

            //console.log(article);

            article.state.timestamp = Date.now();
            article.state.saved = true;

            stripParagraphs();
            if(validateHeader()) {
                addArticle(article.header);
                addParagraphs(article.paragraphs);
            }
            // else console.log("header not validated");
        };

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

        topicService.getAllTopics().then(
            function (res) {
                $scope.topics = res;
                createLookup();
            }, function (err) {
                console.log(err);
            });


        var addArticle = function (articleData) {
            if(articleData.id) {
                articleService.updateArticle(articleData)
                    .then(function (res) {
                        //console.log("article updated");
                    }, function (err) {
                        console.log(err);
                    });
                //console.log("something lets update");
            }else{

                articleService.createArticle(articleData)
                    .then(function (res) {
                        article.header.id = res.id;
                    }, function (err) {
                        console.log(err);
                    });
            }
        };

        var addParagraphs = function (paragraphs) {
            var paragraphData;
            for (var i = 0; i < paragraphs.length; i++) {
                paragraphData = paragraphs[i];
                if (paragraphData.changed) {
                    //console.log("saving paragraph: ");
                    //console.log(paragraphData);
                    addParagraph(paragraphData);
                    paragraphData.changed = false;
                }else{
                    //console.log("wops");
                    //console.log(paragraphData);
                }
            }
        };

        var deleteParagraph = function (paragraph) {
            var formData = {
                article: article.header.id,
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

        var addParagraph = function (paragraphData) {

            //console.log("saving/updating paragraph");
            //console.log(paragraphData);

            var formData = {
                article: article.header.id,
                headline: paragraphData.headline,
                text: paragraphData.text
            };

            if(paragraphData.id){
                formData.id = paragraphData.id;

                paragraphService.updateParagraph(formData)
                    .then(function (res) {
                        //console.log("paragraph updated");
                    }, function (err) {
                        console.log(err);
                    });
            }else{
                paragraphService.createParagraph(formData)
                    .then(function (res) {
                        //console.log("paragraph created: check ID");
                        paragraphData.id = res.id;
                        //console.log(paragraphData);
                    }, function (err) {
                        console.log(err);
                    });
            }
        };
    }]);



