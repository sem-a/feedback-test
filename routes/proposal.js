const express = require("express");
const {
  proposal,
  proposalForId,
  proposalForAuthor,
  proposalCreate,
  proposalDelete,
} = require("../controllers/proposal");
const router = express.Router();

// /api/proposal
router.get("/", proposal);

// /api/proposal/create
router.post("/create", proposalCreate);

// /api/proposal/delete
router.post("/delete", proposalDelete);

module.exports = router;
