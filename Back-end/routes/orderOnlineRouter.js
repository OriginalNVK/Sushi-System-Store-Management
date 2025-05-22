const express = require('express');
const router = express.Router();
const orderOnlineController = require('../controllers/orderOnlineController');

// Định nghĩa các route cho đơn hàng online
router.get('/', orderOnlineController.getOrderOnline); // GET
router.post('/', orderOnlineController.postOrderOnline); // POST
router.put('/:OrderID', orderOnlineController.putOrderOnline); // PUT
router.delete('/:OrderID', orderOnlineController.deleteOrderOnline); // DELETE
router.get('/overview', orderOnlineController.getOrderOnlinePendingOverview); // GET all pending orders (không cần BranchID)
router.get('/overview/:BranchID', orderOnlineController.getOrderOnlinePendingOverview); // GET theo BranchID (nếu cần giữ lại)
router.get('/detail/:OrderID', orderOnlineController.getOrderPendingDetail); // GET
router.post('/place-order', orderOnlineController.postPlaceOrder); //POST

module.exports = router;