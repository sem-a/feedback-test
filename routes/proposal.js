const express = require("express");
const {
  proposal,
  proposalCreate,
  proposalDelete,
} = require("../controllers/proposal");
const { auth } = require("../middleware/auth");
const router = express.Router();

// /api/proposal
router.get("/", proposal);

// /api/proposal/create
router.post("/create", auth, proposalCreate);

// /api/proposal/delete
router.post("/delete", auth, proposalDelete);

module.exports = router;
