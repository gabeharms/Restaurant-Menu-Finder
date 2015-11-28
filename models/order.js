var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    refnum: String,
    creeated: {type: Date, default: Date.now},
    user: {
        _id: Schema.Types.ObjectId,
        firstName: String,
        lastName: String,
        email: String,
        roomNumber: Number
    },
    food: {
        restId: String,
        restName: String,
        items: []
    }
});

var Order = mongoose.model('Order', orderSchema);

module.exports ={
    Order: Order
};