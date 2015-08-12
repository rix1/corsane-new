angular.module('myApp.directives.editable', [])
    .directive('contenteditable', ['$sce', function ($sce) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngConfirmClick;
                    if (message && !confirm(message)) {
                        scope.$apply(attrs.ngConfirmClick);
                    }
                    else {
                        scope.$apply();
                    }
                });
            }
        }
    }]);