const express = require("express");
const { getBranches, deleteBranch, updateBranch } = require("../controllers/branchController");
const router = express.Router();

router.get("/", getBranches);
router.delete("/:id", deleteBranch);
router.put("/:id", updateBranch);
module.exports = router;
