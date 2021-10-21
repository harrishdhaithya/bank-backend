const express = require("express");
const { createUser, getUserById, getAUser, getAllUsers } = require("../controller/user");
const router = express.Router();


router.post("/user/create",createUser)

router.param("userId",getUserById)

router.post("/user/:userId",getAUser)

router.post("/users",getAllUsers)

module.exports = router;