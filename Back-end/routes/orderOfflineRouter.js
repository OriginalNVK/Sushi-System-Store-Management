const express = require('express');
const orderOfflineController = require('../controllers/orderOfflineController');

const router = express.Router();

// Định nghĩa các route cho đơn hàng offline
router.get('/', orderOfflineController.getOrderOffline); // GET
router.get('/overview/:BranchID', orderOfflineController.getOrderOfflinePendingOverview); // GET
router.post('/', orderOfflineController.postOrderOffline); // POST
router.delete('/:OrderID', orderOfflineController.deleteOrderOffline); // DELETE

module.exports = router;