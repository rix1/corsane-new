'use strict';

angular.module('myApp.article', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/article/create', {
                template: '',
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
        $scope.owner = false;

        articleService.getArticle(articleId).then(
            function (article) {
                $scope.article = article;
                if ($rootScope.user && article.author.id === $rootScope.user.id) {
                    $rootScope.goTo('/article/' + articleId + '/edit');
                }
            },
            function (err) {
                console.log(err);
            }
        );
    }])

// =================================================================== // WORK BELOW THIS LINE ===================================================================


    .controller('editArticleCtrl', ['$rootScope', '$scope', '$routeParams', 'articleService', 'topicService', 'paragraphService', function ($rootScope, $scope, $routeParams, articleService, topicService, paragraphService) {
        var headerError = 'Please fill inn Title, Description and Topic before continuing...';

        $scope.state = {};
        $scope.topicLookup = {};
        $scope.article = {
            header: {},
            state: {}
        };
        $scope.owner = true;

        $scope.paragraphUpdate = function (obj, hed, txt, index) {
            $scope.paragraphs[index].headline = hed;
            $scope.paragraphs[index].text = txt;
            $scope.paragraphs[index].changed = true;
        };

        var articleId = $routeParams.id;
        articleService.getArticle(articleId).then(
            function (res) {
                if($rootScope.user && res.author.id === $rootScope.user.id) {
                    $scope.article = res;
                    $scope.paragraphs = res.paragraphs;
                    $scope.owner = true;

                }else{
                    $rootScope.goTo('/article/' + res.id);
                }
            },
            function (err) {
            }
        );

        // ========== HELPER METHODS =============

        var createLookup = function () {
            for (var i = 0; i < $scope.topics.length; i++) {
                $scope.topicLookup[$scope.topics[i].id] = $scope.topics[i];
            }
        };

        var addBlank = function () {
            $scope.paragraphs.push({
                headline: '',
                text: ''
            });
        };

        var validateCoreFields = function () {
            return !!($scope.article.title && $scope.article.introduction && $scope.article.topics);
        };

        /**
         * Remove blank paragraph's and test length
         * @return boolean if there is more than one not blank paragraph
         * */
        var stripParagraphs = function () {
            for (var i = 0; i < $scope.paragraphs.length; i++) {
                var title = $scope.paragraphs[i].headline.length < 1;
                var text = $scope.paragraphs[i].text.length < 1;

                if (title && text) {
                    $scope.paragraphs.splice(i, 1);
                }
                if (title || text) {
                    return false;
                }
            }
            return true;
        };


        $scope.delete = function (paragraph) {
            var index = $scope.article.paragraphs.indexOf(paragraph);
            deleteParagraph(paragraph);
            $scope.article.paragraphs.splice(index, 1);
        };


        // ========== SERVICE FUNCTIONS =============

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


        /**
         * Currently we're saving the article when the first paragraph is added,
         * and when the Save button is pressed. In the future this should be changed with a
         * redirect.
         * */

        $scope.newParagraph = function () {
            if ($scope.paragraphs.length < 1) {
                if (validateCoreFields()) {
                    addArticle($scope.article);
                    addBlank();
                } else {
                    $scope.helptext = headerError;
                }
            } else {
                addBlank();
            }
        };

        $scope.save = function () {
            console.log($scope.paragraphs);
            $scope.state.timestamp = Date.now();
            $scope.state.saved = true;

            stripParagraphs();
            if (validateCoreFields()) {
                addArticle($scope.article);
                addParagraphs($scope.paragraphs);
            }else{
                console.log("Error: Core Fields not validated");
            }
        };

        // CREATE ARTICLE
        var addArticle = function (articleData) {

            var updateData = {
                id: $scope.article.id,
                title: articleData.title,
                introduction: articleData.introduction,
                published: articleData.published,
                //topic: articleData.topics[0].id
            };

            articleService.updateArticle(updateData)
                .then(function (res) {
                }, function (err) {
                    console.log(err);
                });
        };

        /**
         * In oder to add new, and update existing paragraphs we iterate
         * over all paragraphs and see which have the changed flag set. **/

        var addParagraphs = function (paragraphs) {
            var paragraphData;
            for (var i = 0; i < paragraphs.length; i++) {
                paragraphData = paragraphs[i];
                if (paragraphData.changed) {
                    console.log("updating 1 paragraph");
                    addParagraph(paragraphData);
                    paragraphData.changed = false;
                } else {
                }
            }
        };

        // EDIT ARTICLE
        var deleteParagraph = function (paragraph) {
            console.log(paragraph);
            var formData = paragraph.id;

            if (paragraph.id) {

                paragraphService.deleteParagraph(formData)
                    .then(function (res) {
                    }, function (err) {
                        console.log(err);
                    });
            } else {
            }
        };

        // EDIT ARTICLE
        var addParagraph = function (paragraphData) {
            var formData = {
                article: $scope.article.id,
                headline: paragraphData.headline,
                text: paragraphData.text
            };

            if (paragraphData.id) {
                formData.id = paragraphData.id;

                paragraphService.updateParagraph(formData)
                    .then(function (res) {
                    }, function (err) {
                        console.log(err);
                    });
            } else {
                paragraphService.createParagraph(formData)
                    .then(function (res) {
                        paragraphData.id = res.id;
                    }, function (err) {
                        console.log(err);
                    });
            }

        };
    }])

    .controller('newArticleCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        //TODO: Add modaal thingy
    }]);