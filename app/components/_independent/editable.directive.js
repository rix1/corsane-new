angular.module('myApp.directives.editable', [])
    .directive('contenteditable', ['$sce', function ($sce) {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                callback: '&'
            },
            link: function (scope, element, attrs, ngModel) {

                if (!ngModel) {
                    return;
                }else{
                }

                ngModel.$render = function () {
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                // Listen to events to enable binding
                element.on('blur keyup change', function () {
                    scope.$evalAsync(read);
                });

                element.on('blur', function () {
                    scope.callback();
                });

                // Initialize
                read();

                function read() {
                    var html = element.html();

                    if(attrs.strpBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        };
    }]);