const blogController = require("../../controllers/blogController");
const { authCheck } = require("../../middleware/authToken");
const router = require("express").Router();

router.route("/:id").get(blogController.blogController_readOne);
router
  .route("/")
  .get(blogController.blogController_read)
  .post(authCheck, blogController.blogController_create);

module.exports = router;
