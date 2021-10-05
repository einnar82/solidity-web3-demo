import express from 'express'
import {
    accountBalance,
    mintCoin,
    totalSupply,
    transferCoin,
} from '../controllers/coin.controller'


const router = express.Router()

router.post('/mint', mintCoin)
router.post('/transfer', transferCoin)
router.get('/supply', totalSupply)
router.get('/balance/:address', accountBalance)


export default router;