angular.module('toastService', [])
// Toasts service
.factory('toastService', function($cordovaToast) {

    return {
        show: function(content, duration, location) {
            return $cordovaToast.show(message, duration, location)
        }
    };
})
