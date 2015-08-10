'use strict';

angular.module('myApp.landing', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/landing/landing.html',
            controller: 'landingCtrl'
        });
    }])

    .controller('landingCtrl', ['$scope', '$window', function($scope, $window) {

        $scope.topics = [{"title":"Pitching","icon_url":"fa fa-comment","description":"Selling your idea","selected":false},{"title":"Growth Hacking","icon_url":"fa fa-line-chart","description":"Marketing on a budget","selected":false},{"title":"Business Models","icon_url":"fa fa-briefcase","description":"Where does the money come from?","selected":false},{"title":"Building Team","icon_url":"fa fa-users","description":"You're only as strong as...","selected":false},{"title":"Finding Ideas","icon_url":"fa fa-lightbulb-o","description":"They don't grow on trees","selected":false},{"title":"Developing","icon_url":"fa fa-code","description":"Everyone should code","selected":false}];

        // Function for filtering out the selected topics from landing page.
        $scope.next = function(){
            var selected = [];

            for(var i = 0;i< $scope.topics.length;i++){
                if($scope.topics[i].selected){
                    selected.push($scope.topics[i]);
                }
            }
            $window.location.href = '#/register';
        };
    }]);
