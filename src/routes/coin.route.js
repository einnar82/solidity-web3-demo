import express from 'express'
import {
    accountBalance,
    mintCoin,
    totalSupply,
} from '../controllers/coin.controller'


const router = express.Router()

router.post('/mint', mintCoin)
router.get('/supply', totalSupply)
router.get('/balance/:address', accountBalance)


export default router;