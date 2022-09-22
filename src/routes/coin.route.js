const express = require("express");
const {
    accountBalance,
    allowance,
    approveAmount,
    mintCoin,
    totalSupply,
    transferCoin,
    transferFrom,
} = require('../controllers/coin.controller');


const router = express.Router()

router.post('/mint', mintCoin)
router.post('/transfer', transferCoin)
router.post('/transfer/:spender/inbehalf', transferFrom)
router.post('/approve', approveAmount)
router.post('/allowance', allowance)
router.get('/supply', totalSupply)
router.get('/balance/:address', accountBalance)


module.exports = router;
