angular.module('httpInterceptor')
    .factory('httpInterceptor', ['$q', '$location',
        function($q, $location) {
            return function(promise) {
                var success = function(response) {
                    return response;
                };

                // Redirect to login if request fails
                var error = function(response) {
                    if (response.status === 401) {
                        $location.url('/login');
                    }

                    return $q.reject(response);
                };

                return promise.then(success, error);
            };
        }
    ]);