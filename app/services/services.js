 //DEPRECATED 2015-11-27 -rix1

angular.module('myApp.services', [])
    .factory('apiService', [
        function () {

            return{
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }
        }]);