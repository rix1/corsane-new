'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', function FirstCtrl($scope) {
        var c = this;

        c.topics = [{"name":"Pitching","icon":"fa fa-comment","desc":"Selling your idea","selected":false},{"name":"Growth Hacking","icon":"fa fa-line-chart","desc":"Marketing on a budget","selected":false},{"name":"Business Models","icon":"fa fa-briefcase","desc":"Where does the money come from?","selected":false},{"name":"Building Team","icon":"fa fa-users","desc":"You're only as strong as your weakest link","selected":false},{"name":"Finding Ideas","icon":"fa fa-lightbulb-o","desc":"They don't grow on trees","selected":false},{"name":"Developing","icon":"fa fa-code","desc":"Everyone should code","selected":false}];

        $scope.changeClass = function (topic) {
            $scope.selected = true;
            topic.selected = !topic.selected;
            //$scope.box = "selected";
            console.log(topic);
        };


    });
