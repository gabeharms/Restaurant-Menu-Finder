(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('api', apiFactory);
        
        apiFactory.$inject = ['$http'];
        
        function apiFactory($http) {
            return {
                getRestaurants: getRestaurants,
                getRestaurantMenu: getRestaurantMenu,
                createOrder: createOrder
            };
            
            function getRestaurants() {
                return $http.get('/orders/api/restaurants')
                    .then(function(response) {
                        return response.data;
                    });
            }
            
            function getRestaurantMenu(restID) {
                return $http.get('/orders/api/restaurant-details/' + restID)
                .then(function(response) {
                    return response.data;
                })
            }
            
            function createOrder(food) {
                return $http.post('/orders/api/create-order', food)
                    .then(function(response) {
                        return response.data
                    });
            }
        }
        
}());