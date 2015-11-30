'use strict';

angular.module('myApp.profile', ['ui.router'])


	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('pubProfile', {
				url: "/user/{id}",
				templateUrl: 'views/profile/profile.html',
				controller: 'profileCtrl',
				data: {
					login: false,
					admin: false
				}
			})
			.state('myProfile',{
				url: "/profile",
				templateUrl: 'views/profile/profile.html',
				controller: 'myProfileCtrl',
				data: {
					login: true,
					admin: false
				}
			});
	}])

	.controller('profileCtrl', ['$scope', '$stateParams', 'userService', '$state',
		function($scope, $stateParams, userService, $state) {
			$scope.articles = {};

			var userId = $stateParams.id;

			$scope.owner = false;

			// If we ever want to show people a "public" profile, remove this redirect.
			if(userService.currentUser().isAuthenticated()
				&& userService.currentUser().getUser().id == userId){
				$state.go('myProfile');
			}else {
				userService.getUser(userId).then(
					function (res) {
						$scope.user = res;
						getArticles();
					},
					function (err) {
						//console.log(err);
					});
			}

			var getArticles = function () {
				userService.getUser($scope.user.id).then(
					function (res) {
						$scope.articles = res.articles;
						//console.log(res);
					},
					function (err) {
						//console.log(err);
					});
			};

		}
	])

	.controller('myProfileCtrl', ['$state', '$scope', 'userService', 'articleService',
		function($state, $scope, userService, articleService) {
			$scope.articles = {};

			$scope.user = userService.currentUser().getUser();
			$scope.owner = true;
			//console.log($scope.user.id);


			var getArticles = function () {
				userService.getUser($scope.user.id).then(
					function (res) {
						$scope.articles = res.articles;
					},
					function (err) {
						//console.log(err);
					});
			};

			getArticles();

			$scope.logout = function () {
				$state.go('logout');
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
							//$scope.error = err;
						});
				}
			};


			$scope.deleteArticle = function (article) {
				articleService.deleteArticle(article)
					.then(function (res) {
						getArticles();
					},
					function (err) {
						//console.log(err);
					});
			};

			$scope.deleteAccount = function () {
				userService.deleteAccount($scope.user.id).then(
					function(res) {
						$scope.logout();
					},
					function(err) {
						//console.log(err);
					});
			};
		}
	]);