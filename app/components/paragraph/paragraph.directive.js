angular.module('myApp.directives.paragraph', [])
    .directive('paragraph', [function () {
        return {
            restrict: 'E',
            scope: {
                content: '@',
                callback: '&',
                index: '@',
                owner: '='
            },
            templateUrl: "components/paragraph/paragraph.html",
            controller: 'paraCtrl'
        };
    }])

    .controller('paraCtrl', ['$scope', function($scope) {
        $scope.paragraph = JSON.parse($scope.content);

        console.log($scope.owner);

        var defHeadline = "{{paragraph.headline}}";
        var defText = "{{paragraph.text}}";

        var save = {
            paragraph: $scope.paragraph,
            head: "",
            text: "",
            index: $scope.index
        };


        $scope.saveHeadline = function () {
            prep();
            $scope.callback(save);
        };

        $scope.saveText = function () {
            prep();
            $scope.callback(save);
        };


        var prep = function () {
            if($scope.headline == defHeadline){
                save.head = $scope.paragraph.headline;
            }else{
                save.head = $scope.headline;
            }

            if($scope.text == defText){
                save.text = $scope.paragraph.text;
            }else{
                save.text = $scope.text;
            }

            save.text.trim();
            save.head.trim();
        };
    }]);