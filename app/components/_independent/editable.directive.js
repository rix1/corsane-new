angular.module('myApp.directives.editable', [])
    .directive('contenteditable', ['$sce', function ($sce) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {

                if (!ngModel) {
                    return;
                }


                ngModel.$render = function () {
                    //element.html($sce.getTrustedHtml(ngModel.$modelValue || ''));
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                // Listen to events to enable binding
                element.on('blur keyup change', function () {
                    scope.$evalAsync(read);
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