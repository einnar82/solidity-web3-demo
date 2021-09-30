import express from 'express'
import multer from 'multer'
import {
    mintProduct,
    getAccountBalance,
    sendProduct,
    getTokenDetails,
    getProductInfo,
    destroyProduct
} from '../controllers/product.controller'

const upload  = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/:product_id', getProductInfo);
router.delete('/:product_id', destroyProduct);
router.post('/mint', upload.single('image'), mintProduct);
router.post('/send', sendProduct);
router.get('/balance/:address', getAccountBalance);
router.get('/metadata', getTokenDetails);


export default router;