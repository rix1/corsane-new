'use strict';

angular.module('myApp.article', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/article', {
            templateUrl: 'views/article/article.html',
            controller: 'articleCtrl'
        });
    }])

    .controller('articleCtrl', ['$scope', function($scope) {
        var c = this;
        c.a = {"title":"A Better Way to Learn AngularJS","introduction":"Learn AngularJS directives by building a tabs widget using Bootstrap. You'll learn about directve-to-directive communication, transclusion, scope, and more!","author":{"username":"gunnul","facebook_id":"1234edadxaf3","first_name":"Gunnar","last_name":"Stålsett","profile_image":"/somedir/someimg.jpg"},"topic":"AngularJS","published":"16:04:38 2015-08-02","approved":"true","featured":"false","date_created":"16:04:38 2015-08-02","date_published":"16:04:38 2015-08-02","background_image":"img/bg.jpg","paragraphs":[{"headline":" A Better Way to Learn AngularJS","text":"Your roadmap to learning AngularJS. This tutorial will cover the basics with examples, descriptions, and screencasts.Your roadmap to learning AngularJS. This tutorial will cover the basics with examples, descriptions, and screencasts.Your roadmap to learning AngularJS. This tutorial will cover the basics with examples, descriptions, and screencasts.","favorites":23},{"headline":"Simple AngularJS Authentication with JWT","text":"Learn AngularJS directives by building a tabs widget using Bootstrap. You'll learn about directve-to-directive communication, transclusion, scope, and more! Learn AngularJS directives by building a tabs widget using Bootstrap. You'll learn about directve-to-directive communication, transclusion, scope, and more! Learn AngularJS directives by building a tabs widget using Bootstrap. You'll learn about directve-to-directive communication, transclusion, scope, and more!","favorites":3},{"headline":"Use Firebase to Build Realtime Angular Apps","text":" As shown in the video above, these animations are especially neat when your ng-repeat is using dynamic filters or ordering. It provides immediate feedback to the user that the application is changing based on their input in a very delightful way.","favorites":43},{"headline":"Learn how to use Angular with Rails","text":"Learn AngularJS directives by building a tabs widget using Bootstrap. You'll learn about directve-to-directive communication, transclusion, scope, and more! Learn AngularJS directives by building a tabs widget using Bootstrap. You'll learn about directve-to-directive communication, transclusion, scope, and more!","favorites":8}]}<;
    }]);