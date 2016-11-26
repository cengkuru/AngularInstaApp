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
