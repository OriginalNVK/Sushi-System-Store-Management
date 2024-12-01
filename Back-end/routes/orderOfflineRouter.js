const express = require('express');
const orderOfflineController = require('../controllers/orderOfflineController');

const router = express.Router();

// Định nghĩa các route cho đơn hàng offline
router.get('/', orderOfflineController.getOrderOffline); // GET
router.post('/', orderOfflineController.postOrderOffline); // POST
router.put('/', orderOfflineController.putOrderOffline); // PUT
router.delete('/:OrderID', orderOfflineController.deleteOrderOffline); // DELETE

module.exports = router;
