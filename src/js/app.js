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
