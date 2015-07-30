'use strict';

angular.module('myApp.topic', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/topic', {
            templateUrl: 'views/topic/topic.html',
            controller: 'topicCtrl'
        });
    }])

    .controller('topicCtrl', [function() {
        var t = this;
        var topic = {"title":"Pitching","icon_url":"fa fa-comment","desc":"Selling your idea","articles":[{"title":"Talk like a pro","id":"someID"},{"title":"Communication in meetings","id":"someID"},{"title":"«Speak up son!»","id":"someID"}],"selected":false};
        t.topic = topic;
    }]);