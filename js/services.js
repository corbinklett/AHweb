angular.module('services', ['ngResource']).
	factory('GetTweets', function($resource) {
		var GetTweets = $resource('api/index.php/tweets');
		return GetTweets;
});