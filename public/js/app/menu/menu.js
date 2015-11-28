(function() {
    'use script';
    
    angular
        .module('app')
        .controller('MenuController', MenuController);
        
        MenuController.$inject = ['api', '$routeParams', 'ngDialog', '$scope', '$location'];
        
        function MenuController(api, $routeParams, ngDialog, $scope, $location) {
            var vm = this;
            
            vm.items = []
            api.getRestaurantMenu($routeParams.restID)
                .then(function(data) {
                    console.log(data);
                    vm.menu = data;
                }
            );
            
            vm.viewItem = function(item) {
                vm.activeItem = item;
                vm.activeItem.options = [];
                
                ngDialog.open({
                    template: 'item.html',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                });
            };
            
            vm.toggleOption = function(option) {
                var index = vm.activeItem.options.indexOf(option);
                if (index > -1) {
                    vm.activeItem.options.splice(index,1);
                    return;
                }
                vm.activeItem.options.push(option);
            };
            
            vm.addItem = function(item) {
                var newItem = {
                  id: item.id,
                  name: item.name,
                  price: item.price
                };
                if ( item.options.length > 0) {
                    newItem.options = item.options.map(function(item) {
                      return {id: item.id, name: item.name, price: item.price};
                    });
                }
                vm.items.push(newItem);
                ngDialog.closeAll();
            };
            
            vm.cancel = function() {
                ngDialog.closeAll();
            };
            
            vm.checkout = function() {
                var food = {
                    restId: $routeParams.restId,
                    restName: " ",
                    items: vm.items
                };
                api.createOrder(food)
                    .then(function(data){
                        if (data.success) {
                            return $location.url('/payment');
                        }
                        alert('Something went wrong...');
                    });
            };
        }
        
}());