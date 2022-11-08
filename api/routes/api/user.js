const userController = require("../../controllers/userController");
const { authCheck } = require("../../middleware/authToken");
const router = require("express").Router();

router
  .route("/")
  .post(userController.userController_create)
  .get(authCheck, userController.userController_read)
  .put(userController.userController_update)
  .delete(userController.userController_delete);

module.exports = router;
