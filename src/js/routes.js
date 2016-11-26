/**
 * Created by Cengkuru on 8/29/2016.
 */

angular.module('app.routes', [])
.config(['$stateProvider','$urlMatcherFactoryProvider','$urlRouterProvider',function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
    //case insensitive urls
    $urlMatcherFactoryProvider.caseInsensitive(true);


    //configure default route
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state({
            name: 'main',
            abstract: true,
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })

        //welcome
        .state({
            name: 'main.home',
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })

        // Feed
        .state({
            name: 'main.feed',
            url: '/feed',
            templateUrl: 'views/feed.html',
            controller: 'FeedCtrl'
        })
}]);
