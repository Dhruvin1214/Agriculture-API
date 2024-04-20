var mongoose = require('mongoose');
var cartschema = new mongoose.Schema({
    pname:{
        type:String
    },
    price:{
        type:String
    },
    qty:{
        type:String,
        default:1
    }
});

module.exports = mongoose.model('cart',cartschema);