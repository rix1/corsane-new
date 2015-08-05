'use strict';

angular.module('myApp.topic', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/topic', {
            templateUrl: 'views/topic/topic.html',
            controller: 'topicCtrl'
        });
    }])

    .controller('topicCtrl', ['$scope', function($scope) {
        var t = this;
        var topic = {"title":"Pitching","icon_url":"fa fa-comment","desc":"Selling your idea","articles":[{"title":"Talk like a pro","id":"someID"},{"title":"Communication in meetings","id":"someID"},{"title":"«Speak up son!»","id":"someID"}],"selected":false};
        t.topic = topic;

        $scope.articles = [{"headline":" A Better Way to Learn AngularJS","text":"Your roadmap to learning AngularJS. This tutorial will cover the basics with examples, descriptions, and screencasts.","favorites":23},{"headline":"Simple AngularJS Authentication with JWT","text":"Learn AngularJS directives by building a tabs widget using Bootstrap. You'll learn about directve-to-directive communication, transclusion, scope, and more!","favorites":3},{"headline":"Use Firebase to Build Realtime Angular Apps","text":" As shown in the video above, these animations are especially neat when your ng-repeat is using dynamic filters or ordering. It provides immediate feedback to the user that the application is changing based on their input in a very delightful way.","favorites":43},{"headline":"Learn how to use Angular with Rails","text":"In this tutorial you'll learn how to use Angular's ngAnimate to create slick animations.","favorites":8}];


    }]);