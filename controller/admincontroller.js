var adminmodel = require('../model/adminmodel');
var productmodel = require('../model/productmodel');
var usermodel = require('../model/usermodel');
var cartmodel = require('../model/cartmodel');
var ordermodel = require('../model/ordermodel');
const bcrypt = require('bcrypt');

exports.admin=async (req,res) => {
    var b_pass=await bcrypt.hash(req.body.password,10)
    req.body.password=b_pass
    
    var data=await adminmodel.create(req.body)
    res.status(200).json({
        data
    })
}

//ADMIN LOGIN
exports.login = async (req, res) =>{
    var data=await adminmodel.find({"email":req.body.email});
    // var login_status = await storage.getItem('admin_id');

    // if(login_status == undefined){
    //     if(data.length == 1){
    //         await storage.setItem('admin_id',data[0].id);
    //         req.status(200).json({
    //             status:"login success",
    //         })
    //     }
    //     else{
    //         res.status(200).json({
    //             status:"check email and password"
    //         })
    //     }
    // }
    // else{
    //     res.status(200).json({
    //         status:"Admin already login"
    //     })
    // }

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

//ADD PRODUCT
exports.add_product = async (req, res) => {
    var data = await productmodel.create(req.body);
    res.status(200).json({
        data
    })
};

//VIEW PRODUCT
exports.view_product = async (req, res) => {
    var data = await productmodel.find();
    res.status(200).json({
        data
    })
}

//UPADATE PRODUCT
exports.update_product = async (req, res) => {
    var id = req.params.id;
    var data = await productmodel.findByIdAndUpdate(ia,req.body);
    res.status(200).json({
       data
    })
}

//DELETE PRODUCT
exports.delete_product = async (req, res) => {
    var id = req.params.id;
    var data = await productmodel.findByIdAndDelete(id);
    res.status(200).json({
        status:"Product deleted"
    })
}


//VIEW USER
exports.view_user = async (req, res) => {
    var data = await usermodel.find();
    res.status(200).json({
        data
    })
}

//VIEW BILL
// exports.view_bill = async (req, res) => {
//     var data = await cartmodel.find({"__v":1});
//     var total = 0;

//     for (var i in data) {
//         // console.log(data[i].price);
//         total = total + parseInt(data[i].price);
//     }

//     res.status(200).json({
//         status:"Total Bill Amount : "+total
//     })
// }



//VIEW ORDER (ACCEPETED ORDERS)
exports.view_order = async (req, res) => {
    var cartData = await cartmodel.find({"__v":1});

    res.status(200).json({
        cartData
    })
}

//VIEW CANCELLED ORDERS
exports.cancel_order = async (req,res) =>{
    var data = await cartmodel.find({"__v":2});
    res.status(200).json({
        status:"Cancelled Orders : ",
        data
    })
}

//VIEW PENDING ORDERS
exports.pending_order = async (req, res) =>{
    var data = await cartmodel.find({"__v":0});
    res.status(200).json({
        status:"Pending Orders : ",
        data
    })
}

//VIEW BILL
exports.view_bill = async (req, res) => {
    var data = await ordermodel.find({$or:[{"__v":1},{"__v":3}]});
    var total = 0;
    
    for (var i in data) {
        // console.log(data[i].price);
        total = total + parseInt(data[i].price * data[i].qty);
    }

    res.status(200).json({
        status:"Total Bill Amount : "+total,
    })
}

//UPDATE ORDER STATUS
exports.order_status = async (req, res) => {
    var id = req.params.id;
    var data = await ordermodel.findById(id);
    var __v = await data.__v;
    
    if(__v == "1"){
        order_status = "Order Accepted";
    }
    if(__v == "2"){
        order_status = "Order Cancelled"
    }
    if(__v == "3"){
        order_status = "Order Delieverd"
    }
    req.body.order_status = order_status;
    
    var updateData = await ordermodel.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:"Order Upadte",
        Current_status : order_status
    })
}