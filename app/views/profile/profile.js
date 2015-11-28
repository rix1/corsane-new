'use strict';

angular.module('myApp.profile', ['ui.router'])


	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('pubProfile', {
				url: "/user/{id}",
				templateUrl: 'views/profile/profile.html',
				controller: 'profileCtrl'
			})
			.state('myProfile',{
				url: "/profile",
				templateUrl: 'views/profile/profile.html',
				controller: 'myProfileCtrl'
			});
	}])

	.controller('profileCtrl', ['$scope', '$stateParams', 'userService',
		function($scope, $stateParams, userService) {

			var userId = $stateParams.id;

			userService.getUser(userId).then(
				function(res) {
					$scope.user = res;
				},
				function(err) {
					console.log(err);
				});
		}
	])

	.controller('myProfileCtrl', ['$state', '$rootScope', '$scope', 'userService', 'articleService',
		function($state, $rootScope, $scope, userService, articleService) {

			$scope.myArticles = {};

			if(!$rootScope.user) {
				$state.go('login');
				//return $rootScope.goTo("/login");
			}

			$scope.user = $rootScope.user;

			var getArticles = function () {
				userService.getUser($scope.user.id).then(
					function (res) {
						$scope.myArticles = res.articles;
					},
					function (err) {
						console.log(err);
					});
			};

			getArticles();

			$scope.logout = function () {
				$state.go('logout');
				//$rootScope.goTo("/logout");
			};

			$scope.passwordForm = false;

			$scope.togglePasswordForm = function() {
				$scope.passwordForm = !$scope.passwordForm;
			};

			$scope.changePassword = function () {
				if(this.newPassword !== this.repeatedNewPassword) {
					$scope.error = "Password mismatch";
				}
				else {
					userService.change_password(this.newPassword).then(
						function(res) {
							$scope.successMessage = "Your password has been updated";
							$scope.passwordForm = false;
						},
						function(err) {
							$scope.error = err;
						});
				}
			};


			$scope.deleteArticle = function(article){
				articleService.deleteArticle(article)
					.then(function(res){
						getArticles();
					},
					function(err){
						console.log(err);
					});
			}

			$scope.deleteAccount = function () {
				userService.deleteAccount($rootScope.user.id).then(
					function(res) {
						$scope.logout();
					},
					function(err) {
						console.log("Something went wrong")
					});
			};
		}
	]);