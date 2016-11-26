/**
 * Created by Cengkuru on 8/29/2016.
 */

angular.module('AngularInstaApp', ['ui.router', 'ngMaterial', 'app.routes', 'app.mainCtrl','app.homeCtrl','app.feedCtrl','angular-loading-bar', 'ngMdIcons', 'toastService',  'orderByTimestampFilter'])
    // loading defaults
    .run(['$rootScope', function ($rootScope) {
        $rootScope.previousState;
        $rootScope.currentState;

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            $rootScope.returnToStateParams = fromParams.id;
            console.log('Previous state:' + $rootScope.previousState)
            console.log('Previous state with id :' + $rootScope.returnToStateParams)
            console.log('Current state:' + $rootScope.currentState)
        });
    }
    ])


    // Material them configuration
    .config(['$mdThemingProvider', 'cfpLoadingBarProvider', function ($mdThemingProvider, cfpLoadingBarProvider) {
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');

        cfpLoadingBarProvider.includeSpinner = true;

    }])

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

angular.module('app.mainCtrl',[])
.controller('MainCtrl', ['$scope', '$location', '$state', '$rootScope','$mdBottomSheet', '$mdSidenav', '$mdDialog','$timeout', function($scope, $location,   $state, $rootScope,$mdBottomSheet,$mdSidenav,$mdDialog,$timeout) {

    $mdSidenav('left',true).then(function(leftNav) { leftNav.close(); });

    // Toolbar search toggle
    $scope.toggleSearch = function(element) {
        $scope.showSearch = !$scope.showSearch;
    };
    // Sidenav toggle
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };



    
    // Menu items
    $scope.menu = [

        {
            link: 'main.home',
            title: 'Dashboard2',
            icon: 'home'
        },
        {
            link: 'main.users',
            title: 'Users',
            icon:'people'
        },
        {
            link: 'main.inbox',
            title: 'Inbox',
            icon:'mail'
        },
        {
            link: 'main.about',
            title: 'About',
            icon:'mail'
        },
        {
            link: '',
            title: 'main.categories',
            icon:'mail'
        },
        {
            link: '',
            title: 'Products',
            icon:'mail'
        },
        {
            link: '',
            title: 'Services',
            icon:'mail'
        },
        {
            link: '',
            title: 'Testimonials',
            icon:'mail'
        }
    ];
    $scope.admin = [
        {
            link: 'showListBottomSheet($event)',
            title: 'Settings',
            icon:'settings'
        },
        {
            link: 'showListBottomSheet($event)',
            title: 'Send feedback',
            icon:'feedback'
        },
        {
            link: 'showListBottomSheet($event)',
            title: 'Help',
            icon:'help'
        }
    ];


}])

angular.module('app.homeCtrl',[])
.controller('HomeCtrl', ['$scope', '$rootScope',function($scope, $rootScope) {

    // Menu items
    $scope.menu=[];
    $scope.menu = [

        {
            link: 'main.home',
            title: 'Home',
            icon: 'home'
        }
        ,
        {
            link: 'main.explore',
            title: 'Explore',
            icon: 'search'
        },
        {
            link: 'main.trending',
            title: 'Trending Tags',
            icon:'trending_up'
        },
        {
            link: 'main.posts',
            title: 'Posts',
            icon: 'my_library_books'
        },
        {
            link: 'main.notifications',
            title: 'Notifications',
            icon:'mail'
        }
        ,
        {
            link: 'main.profile',
            title: 'Profile',
            icon:'person'
        }
    ];



}])

angular.module('app.feedCtrl',[])
.controller('FeedCtrl', ['$scope', '$rootScope',function($scope, $rootScope) {




}])

angular.module('toastService', [])
// Toasts service
.factory('toastService', function($cordovaToast) {

    return {
        show: function(content, duration, location) {
            return $cordovaToast.show(message, duration, location)
        }
    };
})

angular.module('orderByTimestampFilter',[])
.filter('orderByTimestamp', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})
