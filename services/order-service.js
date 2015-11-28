var config = require('../config');
var http = require('http');
var Order = require('../models/order').Order;

exports.getRestaurants = function(next) {
    var address = config.address.street + ", " + config.address.zip;
    var path = config.searchPath;
    var path = path + '?client_id=' + config.clientKey;
    var path = path + '&address=' + address;
   
    var options = {
        host: config.target,
        port: 80,
        path: path
    };

    console.log(path);
    
    var raw_restaurants = "";
    var restaurants = [];
    http.get(options, function(res) {
        res.on("data", function(chunk) {
            raw_restaurants = raw_restaurants + chunk;
        });
        res.on('end', function() {
            raw_restaurants = JSON.parse(raw_restaurants).merchants;
            raw_restaurants.forEach(function(item) {
                restaurants.push( 
                    {
                        id: item.id,
                        name: item.summary.name,
                        type: item.summary.type_label,
                        description: (item.summary.cuisines) ? item.summary.cuisines[0]: null,
                        delivers: item.ordering.availability.delivery,
                        website: item.summary.url.complete
                    }
                );
            });
            return next(null, restaurants);
        });
    }).on('error', function(e) {
        return next("API Request Error", null)
    });
};

exports.getRestaurantMenu = function(restID, next) {
    var options = {
        host: config.target,
        port: 80,
        path: config.menuPath + restID + '/menu?client_id=' + config.clientKey 
    };

    var menu = [];
    var raw_menu = "";
    http.get(options, function(res) {
        res.on("data", function(chunk) {
            raw_menu = raw_menu + chunk;
        });
        res.on('end', function() {
            raw_menu = JSON.parse(raw_menu).menu;
            raw_menu.forEach(function(category) {
                menu.push( 
                    {
                        id: category.id,
                        name: category.name,
                        description: category.description,
                        price: category.price,
                        children: category.children
                    }
                );
            });
            return next(null, menu);
        });
    }).on('error', function(e) {
        return next("API Request Error", null)
    });
};
    
exports.createOrder = function(user, food, next) {
    var order = new Order({
        user: user,
        food: food
    });
    order.save(function(err, savedOrder) {
        if (!err) {
            return next(null, savedOrder._id);
        }
        next(err);
    });
} 

    