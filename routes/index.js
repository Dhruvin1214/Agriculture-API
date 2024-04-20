var express = require('express');
var router = express.Router();
var admincontroller = require('../controller/admincontroller');
const { route } = require('./users');

router.post('/',admincontroller.admin);
router.post('/add_product',admincontroller.add_product);
router.get('/view_product',admincontroller.view_product);
router.post('/update_product/:id',admincontroller.update_product);
router.get('/delete_product/:id',admincontroller.delete_product);
router.get('/view_user',admincontroller.view_user);
router.get('/view_bill',admincontroller.view_bill);
router.get('/view_order',admincontroller.view_order);
router.get('/cancel_order',admincontroller.cancel_order);
router.get('/pending_order',admincontroller.pending_order);
router.post('/order_status/:id',admincontroller.order_status);

module.exports = router;
