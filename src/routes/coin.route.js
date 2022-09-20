import express from 'express'
import {
    accountBalance,
    allowance,
    approveAmount,
    mintCoin,
    totalSupply,
    transferCoin,
    transferFrom,
} from '../controllers/coin.controller'


const router = express.Router()

router.post('/mint', mintCoin)
router.post('/transfer', transferCoin)
router.post('/transfer/:receiver/inbehalf', transferFrom)
router.post('/approve', approveAmount)
router.post('/allowance', allowance)
router.get('/supply', totalSupply)
router.get('/balance/:address', accountBalance)


export default router;