const express = require('express');
const router = express.Router();
const orderOnlineController = require('../controllers/orderOnlineController');

// Định nghĩa các route cho đơn hàng online
router.get('/', orderOnlineController.getOrderOnline); // GET
router.post('/', orderOnlineController.postOrderOnline); // POST
router.put('/', orderOnlineController.putOrderOnline); // PUT
router.delete('/:OrderID', orderOnlineController.deleteOrderOnline); // DELETE

module.exports = router;