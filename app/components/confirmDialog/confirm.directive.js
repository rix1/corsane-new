angular.module('myApp.directives.ngReallyClick', [])
    .directive('ngConfirmClick', function () {
        return {
            priority: -1,
            restrict: 'A',
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
    });
