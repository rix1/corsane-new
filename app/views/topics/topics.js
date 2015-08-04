angular.module('myApp.topics', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/topics', {
            templateUrl: 'views/topics/topics.html',
            controller: 'topicsCtrl'
        });
    }])

    .controller('topicsCtrl', [function() {
        var t = this;
        var data = [{"title":"Pitching","icon_url":"fa fa-comment","desc":"Selling your idea","articles":[{"title":"Talk like a pro","id":"someID"},{"title":"Communication in meetings","id":"someID"},{"title":"«Speak up son!»","id":"someID"}],"selected":false},{"title":"Growth Hacking","icon_url":"fa fa-line-chart","desc":"Marketing on a budget","articles":[{"title":"The new form of marketing","id":"someID"},{"title":"The rules have changed","id":"someID"},{"title":"Internet marketing","id":"someID"},{"title":"The rules have changed","id":"someID"}],"selected":false},{"title":"Business Models","icon_url":"fa fa-briefcase","desc":"Where does the money come from?","articles":[{"title":"Increasing revenue","id":"someID"},{"title":"Two steps to succsess","id":"someID"}],"selected":false},{"title":"Building Team","icon_url":"fa fa-users","desc":"You're only as strong as...","articles":[{"title":"Spotting the weak","id":"someID"},{"title":"Removing obstacles","id":"someID"},{"title":"Killing dead weight","id":"someID"},{"title":"Motivation for the weak","id":"someID"}],"selected":false},{"title":"Finding Ideas","icon_url":"fa fa-lightbulb-o","desc":"They don't grow on trees","articles":[{"title":"Green is not a creative color","id":"someID"}],"selected":false},{"title":"Developing","icon_url":"fa fa-code","desc":"Everyone should code","articles":[{"title":"ICT4D at UCT","id":"someID"},{"title":"DevOps: What's the deal","id":"someID"}],"selected":false}];

        t.topics = data;
    }]);