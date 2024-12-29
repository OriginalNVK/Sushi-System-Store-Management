const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

router.get('/', dishController.getAllDishForCus);
router.get('/:BranchID', dishController.getAllDish);
router.get('/:DishID', dishController.getDish);
router.post('/', dishController.addNewDish);
router.delete('/:DishID', dishController.deleteDish);
router.put('/:DishID', dishController.updateDish);

module.exports = router;