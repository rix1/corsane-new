angular.module('myApp.directives.modalDialog', [])
    .directive('modalDialog', function () {
        return {
            restrict: 'E',
            scope: {
                show: '=',
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                console.log("modal: " + scope.show);
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function () {
                    scope.show = false;
                };
                //scope.createArticle = function (article) {
                //    console.log("lager artikkel!");
                //}
            },
            controller: 'modalCtrl',
            templateUrl: "components/modal/modal.html"
        };
    })


    .controller('modalCtrl', ['$rootScope', '$scope', 'topicService', 'articleService', function ($rootScope, $scope, topicService, articleService) {
        //console.log($scope.content);

        $scope.article = {};
        $scope.topicLookup = {};

        $scope.createArticle = function () {
            var a = $scope.article;
            console.log($scope.article);
            if(a.title === "" || a.introduction === "" || !a.topics){
                $scope.error = "Please fill in all of the fields above";
            }else{
                addArticle($scope.article);
            }
        };

        var createLookup = function () {
            // Genious lookup object <-- THIS REALLY IS THE SHIT (Biased source)
            for (var i = 0; i < $scope.topics.length; i++) {
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

        // CREATE ARTICLE
        var addArticle = function (articleData) {
            articleService.createArticle(articleData)
                .then(function (res) {
                    console.log("Article created:");
                    console.log(res);
                    $rootScope.goTo('/article/' + res.id + '/edit');
                }, function (err) {
                    console.log(err);
                })
        }
    }]);