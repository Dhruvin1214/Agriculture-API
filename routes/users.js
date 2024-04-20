var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/usercontroller');

router.post('/register',usercontroller.register);
router.post('/login',usercontroller.login);

router.get('/view_product',usercontroller.view_product);
router.post('/add_to_cart/:id',usercontroller.add_to_cart);
router.get('/buy_product/:id',usercontroller.buy_product);
router.get('/view_bill',usercontroller.view_bill);


module.exports = router;
