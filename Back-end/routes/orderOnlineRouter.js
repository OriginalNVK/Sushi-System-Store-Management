const express = require('express');
const orderOnlineController = require('../controllers/orderOnlineController');

const router = express.Router();

// Định nghĩa các route cho đơn hàng online
router.get('/', orderOnlineController.getOrderOnline); // GET
router.post('/', orderOnlineController.postOrderOnline); // POST
router.put('/:OrderID', orderOnlineController.putOrderOnline); // PUT
router.delete('/:OrderID', orderOnlineController.deleteOrderOnline); // DELETE
router.get('/overview/:BranchID', orderOnlineController.getOrderOnlinePendingOverview); // GET
router.get('/detail/:OrderID', orderOnlineController.getOrderOnlinePendingDetail); // GET

module.exports = router;