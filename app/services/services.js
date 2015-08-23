angular.module('myApp.services', [])
    .factory('apiService', ['$localStorage', '$cookieStore',
        function ($localStorage, $cookieStore) {

            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                return window.atob(output);
            }

            return{
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },

                // Reconstruct userObject from token
                getClaimsFromToken: function() {

                    // Check if oauth cookie exists
                    var oauthCookie = $cookieStore.get('oauth').token;
                    if(oauthCookie) {
                        $localStorage.token = oauthCookie.token; // Add its token to localStorage
                        $cookieStore.remove('oauth'); // Remove cookie (no longer needed)
                    }

                    var token = $localStorage.token;

                    if (typeof token !== 'undefined') {
                        var user = {};
                        var encoded = token.split('.')[1];
                        user = JSON.parse(urlBase64Decode(encoded));
                    }

                    return user;
                }
            }
        }]);