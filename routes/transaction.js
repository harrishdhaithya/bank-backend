const express = require("express");
const { makeTransaction, getAllTransactions, getTransactionOfUser } = require("../controller/transaction");
const router = express.Router();
const { getUserById } = require("../controller/user")


router.param("userId",getUserById)

router.post("/transaction/make",makeTransaction);

router.post("/transaction/get",getAllTransactions)
router.post("/transaction/get/:userId",getTransactionOfUser)


module.exports = router;