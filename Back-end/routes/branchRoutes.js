const express = require("express");
const { getBranches, addBranch, deleteBranch, updateBranch } = require("../controllers/branchController");
const router = express.Router();

router.get("/", getBranches);
router.post("/", addBranch);
router.delete("/:id", deleteBranch);
router.put("/:id", updateBranch);
module.exports = router;
