'use strict';

angular.module('myApp.lab', ['ui.router'])

	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('adminPanel', {
				url: "/admin",
				templateUrl: 'views/lab/lab.html',
				controller: 'adminCtrl',
				data: {
					login: true,
					admin: true
				}
			});
	}])

	.controller('adminCtrl', ['$state', '$scope', 'topicService','articleService', 'paragraphService', 'userService',
		function($state, $scope, topicService, articleService, paragraphService, userService) {
			$scope.topics = {};

			console.log(userService.currentUser().getUser());


			$scope.addTopic = function (topic) {
				var formdata = {
					title: topic.title,
					description: topic.description
				};

				$scope.topic = {};

				topicService.addTopic(formdata)
					.then(function (res) {
						$scope.topic.res = res.id;
						allTopics();
					}, function (err) {
						// console.log(err);
					});
			};


			$scope.updateTopic = function (topic) {

				var update = {
					id: topic.id,
					description: topic.description
				};

				console.log(update);

				topicService.updateTopic(update)
					.then(function (res) {
						console.log("topic updated");
						console.log(res);
						allTopics();
					}, function (err) {
						console.log(err);
					});
			};

			var allTopics = function () {
				topicService.getAllTopics().then(
					function (topics) {
						$scope.topics = topics;
					},
					function (err) {
					}
				);
			};
			allTopics();


			$scope.deleteTopic = function(topic){
				topicService.deleteTopic(topic)
					.then(function(res){
						allTopics();
					}, function(err){
					})
			};



			$scope.addArticle = function (article) {
				var formdata = {
					title: article.title,
					introduction: article.introduction,
					topics: article.topic,
					published: true,
					featured: true,
					approved: true
				};

				articleService.createArticle(formdata)
					.then(function (res) {
						$scope.article.res = res.id;
					}, function (err) {
						// console.log(err);
					});
			};

			$scope.addParagraph = function (paragraph) {
				var formdata = {
					article: paragraph.article,
					headline: paragraph.headline,
					text: paragraph.text
				};

				paragraphService.createParagraph(formdata)
					.then(function (res) {
						$scope.paragraph.res = res.id;
					}, function (err) {
						// console.log(err);
					});
			};
		}]);