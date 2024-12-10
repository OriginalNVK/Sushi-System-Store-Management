const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

router.get('/:DishID', dishController.getDish);
router.post('/add-new-dish', dishController.addNewDish);
router.delete('/delete-dish/:DishID', dishController.deleteDish);
router.put('/update-dish/:DishID', dishController.updateDish);

module.exports = router;