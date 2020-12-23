const router = require("express").Router();
const searchResponseController = require("../../controllers/searchResponseController");

// Matches with "/api/searchResponse"
router.route("/")
  .get(searchResponseController.findAll);

module.exports = router;