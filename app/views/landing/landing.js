'use strict';

angular.module('myApp.landing', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/landing', {
            templateUrl: 'views/landing/landing.html',
            controller: 'landingCtrl'
        });
    }])

    .controller('landingCtrl', ['$scope', '$window', function($scope, $window) {
        var c = this;

        $scope.select = function() {
            $scope.selected = true;
        };

        c.topics = [{"title":"Pitching","icon_url":"fa fa-comment","desc":"Selling your idea","selected":false},{"title":"Growth Hacking","icon_url":"fa fa-line-chart","desc":"Marketing on a budget","selected":false},{"title":"Business Models","icon_url":"fa fa-briefcase","desc":"Where does the money come from?","selected":false},{"title":"Building Team","icon_url":"fa fa-users","desc":"You're only as strong as...","selected":false},{"title":"Finding Ideas","icon_url":"fa fa-lightbulb-o","desc":"They don't grow on trees","selected":false},{"title":"Developing","icon_url":"fa fa-code","desc":"Everyone should code","selected":false}];


        // Function for filtering out the selected topics from landing page.
        $scope.next = function(){
            var selected = [];

            for(var i = 0;i< c.topics.length;i++){
                if(c.topics[i].selected){
                    selected.push(c.topics[i]);
                }
            }
            $window.location.href = '#/topics';
            //console.log(selected);
        };
    }]);
