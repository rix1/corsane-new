'use strict';

angular.module('myApp.lab', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/admin', {
		templateUrl: 'views/lab/lab.html',
	});
}])

.controller('labCtrl', ['$rootScope', '$scope', 'topicService','articleService', 'paragraphService', function($rootScope, $scope, topicService, articleService, paragraphService) {
	$scope.topics = {};

	console.log($rootScope.user);

	if (!$rootScope.user || !$rootScope.user.is_admin == true) {
		$rootScope.goTo('/');
	}

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

	var allTopics = function(){
		topicService.getAllTopics().then(
			function(topics){
				$scope.topics = topics;
			},
			function(err){
			}
		);
	}

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