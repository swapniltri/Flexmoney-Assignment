const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");

router.get("/" , userController.entry);
router.get("/home", userController.home);
router.get("/join", userController.join_get);
router.get("/batch",userController.get_batch);
router.get("/signout",userController.signout);

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/batch", userController.batch);
router.post("/batch_select",userController.batch_select);
router.post("/batch_change",userController.batch_change);
// router.post("/join", userController.join_post);

module.exports = router;