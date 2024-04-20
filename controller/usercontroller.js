var usermodel = require('../model/usermodel');
var productmodel = require('../model/productmodel');
var cartmodel = require('../model/cartmodel');
var ordermodel = require('../model/ordermodel');
const bcrypt = require('bcrypt');
const { request } = require('express');

//USER REGISTER
exports.register=async (req,res) => {
    var b_pass=await bcrypt.hash(req.body.password,10)
    req.body.password=b_pass
    
    var data=await usermodel.create(req.body)
    res.status(200).json({
        data
    })
}

//USER LOGIN
exports.login = async (req, res) => {
    var data = await usermodel.find({"email":req.body.email});
    
    if(data.length == 1){
        bcrypt.compare(req.body.password, data[0].password, function(err, result) {
            if(result == true){
                res.status(200).json({
                    status:"Login Successful"
                })
            }
            else{
                res.status(200).json({
                    status:"Check your email and password"
                })
            }
        });
    }
    else{
        res.status(200).json({
            status:"check email and password"
        })
    }
}

// ===================================================
//                     PRODUCT
// ===================================================

//VIEW PRODUCT
exports.view_product = async (req, res) => {
    var data = await productmodel.find();
    res.status(200).json({
        data
    })
}

//ADD TO CART
exports.add_to_cart = async (req, res) => {
    var id = req.params.id;
    var productData = await productmodel.findById(id);

    var cartData = await cartmodel.create({"pname":productData.pname, "price":productData.price,"qty":req.body.qty});
    res.status(200).json({
        status:"Product added into cart",
    })
}

//BUY PRODUCT
exports.buy_product = async (req, res) => {
    var id = req.params.id;
    var data = await cartmodel.findById(id);

    if(data != null){
        var moveData = await ordermodel.create({"pname":data.pname,"qty":data.qty,"price":data.price});
        // var removeData = await cartmodel.findByIdAndDelete(id);
    }
    else{
        res.status(200).json({
            status:"Selected item not found in cart",
        })
    }

    res.status(200).json({
        status:"Product Bought",
    })
}

//VIEW BILL
exports.view_bill = async (req, res) => {
    var data = await ordermodel.find({"__v":1});
    var total = 0;
    
    for (var i in data) {
        // console.log(data[i].price);
        total = total + parseInt(data[i].price * data[i].qty);
    }

    res.status(200).json({
        status:"Total Bill Amount : "+total,
    })
}