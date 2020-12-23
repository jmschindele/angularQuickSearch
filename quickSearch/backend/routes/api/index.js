const router = require("express").Router();
const searchResponseRoutes = require("./searchResponse");

// User routes
router.use("/searchResponse", searchResponseRoutes);

module.exports = router;