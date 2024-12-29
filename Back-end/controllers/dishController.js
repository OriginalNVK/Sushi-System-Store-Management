const dishModel = require('../models/dishModel');


const getAllDish = async (req, res) => {
    const { BranchID } = req.params;
    try {
      const dish = await dishModel.getAllDishes(BranchID);
      res.json(dish);
    } catch (err) {
      console.error("Error fetching dish:", err);
      res.status(500).json({ error: "An error occurred while fetching dish" });
    }
  };

const getDish = async (req, res) => {
    const { DishID } = req.params;

    try {
        const dish = await dishModel.getDishById(DishID);

        if (dish) {
            res.status(200).json(dish);
        } else {
            res.status(404).json({ message: 'Dish not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addNewDish = async (req, res) => {
    const { BranchID, DirectoryName, DishID, DishName, Price } = req.body;

    try {
        await dishModel.addDish(BranchID, DirectoryName, DishID, DishName, Price);
        res.status(200).json({ message: 'Dish added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDish = async (req, res) => {
    const { DishID } = req.params;

    try {
        await dishModel.deleteDishById(DishID);
        res.status(200).json({ message: 'Dish deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDish = async (req, res) => {
    const { BranchID, DirectoryName, DishID, NewDishName, NewPrice } = req.body;

    try {
        await dishModel.updateDish(BranchID, DirectoryName, DishID, NewDishName, NewPrice);
        res.status(200).json({ message: 'Dish updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllDish,
    getDish,
    addNewDish,
    deleteDish,
    updateDish
};