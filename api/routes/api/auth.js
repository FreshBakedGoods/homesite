const authController = require("../../controllers/authController");
const { createAuthToken } = require("../../middleware/authToken");
const router = require("express").Router();

router
  .route("/")
  .post(authController.authController_login, createAuthToken)
  .delete(authController.authController_logout);

module.exports = router;
