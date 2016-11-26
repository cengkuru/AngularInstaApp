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
