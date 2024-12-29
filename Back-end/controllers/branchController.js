const { getBranchesModel, deleteBranchModel, updateBranchModel } = require("../models/branchModels");


const getBranches = async (req, res) => {
  try {
    const branches = await getBranchesModel();
    res.json(branches);
  } catch (err) {
    console.error("Error fetching branches:", err);
    res.status(500).json({ error: "An error occurred while fetching branches" });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteBranchModel(id);

    if (!result) {
      return res.status(404).json({ error: "Branch not found" });
    }

    res.status(200).json({ message: `Branch with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting branch:", err);
    res.status(500).json({ error: "An error occurred while deleting the branch" });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branchData = req.body;

    if (!branchData) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await updateBranchModel(id, branchData);

    if (!result) {
      return res.status(404).json({ error: "Branch not found" });
    }

    res.status(200).json({ message: `Branch with ID ${id} updated successfully` });
  } catch (err) {
    console.error("Error updating branch:", err);
    res.status(500).json({ error: "An error occurred while updating the branch" });
  }
};

module.exports = { getBranches, deleteBranch, updateBranch };
