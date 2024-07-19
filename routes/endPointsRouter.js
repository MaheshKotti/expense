const express = require('express');
const endPointsController = require("../controllers/endPointsController");
const router = express.Router();

router.get("/get-configs", endPointsController.getConfigs);


module.exports = router;