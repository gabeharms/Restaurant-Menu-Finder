(function() {
    'use strict'

    angular
        .module('app')
        .config(config)

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/restaurants', {
                templateUrl: '/js/app/restaurants/restaurants.html',
                controller: 'RestaurantsController',
                controllerAs: 'vm'
            })
            .when('/menu/:restID', {
                templateUrl: '/js/app/menu/menu.html',
                controller: 'MenuController',
                controllerAs: 'vm'
            })
            .when('/payment', {
                templateUrl: '/js/app/payment/payment.html',
                controller: 'PaymentController',
                controllerAs: 'vm'
            });
            
    }
}());