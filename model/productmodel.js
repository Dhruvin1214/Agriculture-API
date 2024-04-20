var mongoose = require('mongoose');
var productschema = new mongoose.Schema({
    pname:{
        type:String
    },
    price:{
        type:String
    }
});

module.exports = mongoose.model('product',productschema);