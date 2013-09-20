var AHapp = angular.module('AHapp', ['services', 'ngAnimate', 'ngRoute']);

AHapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.    
    when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl}).
    when('/local', {templateUrl: 'partials/local.html', controller: LocalCtrl}).
    when('/social', {templateUrl: 'partials/social.html', controller: SocialCtrl}).
    when('/getinvolved', {templateUrl: 'partials/getinvolved.html', controller: GetInvolvedCtrl}).   
    otherwise({redirectTo: '/home'});
}]);
