var mongoose = require('mongoose');
var orderschema = new mongoose.Schema({
    pname:{
        type:String
    },
    price:{
        type:String
    },
    qty:{
        type:String
    },
    order_status:{
        type:String,
        default:"pending"
    },
});

module.exports = mongoose.model('order',orderschema);