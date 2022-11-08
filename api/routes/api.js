const router = require("express").Router();
const apiController = require("../controllers/apiController");
const userRouter = require("./api/user");
const authRouter = require("./api/auth");
const blogRouter = require("./api/blog");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.route("/").get(apiController.apiController_read);

module.exports = router;
