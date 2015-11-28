var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var orderService = require('../services/order-service');

router.get('/', restrict, function(req, res, next) {
    
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    var vm = {
         title: 'Place an order',
         orderId: req.session.orderId,
         firstName: req.user ? req.user.firstName : null 
    }
  res.render('orders/index', vm);
});

router.get('/api/restaurants', restrict, function(req, res, next) {
    orderService.getRestaurants(function(err, restaurants) {
        if (err) {
            console.log(err);
            return res.status(500).json;
        }
        res.json(restaurants);
    });
});

router.get('/api/restaurant-details/:restID', function(req, res, next) {
    orderService.getRestaurantMenu(req.params.restID, function(err, menu) {
        if (err) {
            console.log(err);
            return res.status(500).json;
        }
        res.json(menu);
    })
});

router.post('/api/create-order', restrict, function (req, res, next) {
    orderService.createOrder(req.user._doc, req.body, function(err, orderId) {
        if (err) {
            return res.status(500).json;
        }
        req.session.order_id = orderId;
        res.json({success: true});
    });
});


module.exports = router;
