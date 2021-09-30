import {
    File
} from "nft.storage";
import {
    minterAddress,
    productContract,
    web3
} from "../config"

import {
    storageClient
} from '../helpers';

const createMetadata = async (req) => {
    try {
        const metadata = await storageClient.store({
            name: req.body.name,
            description: req.body.description,
            image: new File(req.file.image,
                'pinpie.jpg', {
                    type: 'image/jpg'
                }
            ),
        })
        return metadata;
    } catch (error) {
        throw error;
    }
}

const mintProduct = async (req, res) => {
    try {
        const metadata = await createMetadata(req);
        const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
        const contract = await productContract()
        const block = await web3.eth.getBlock("latest");
        await contract.methods.awardItem(req.body.address, metadataURI)
            .send({
                from: minterAddress,
                gas: block.gasLimit
            })
        return res.json({
            message: 'created'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error.message
        })
    }

}

const getTokenDetails = async (req, res) => {
    try {
        const contract = await productContract();
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        return res.json({
            data: {
                name,
                symbol
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const getAccountBalance = async (req, res) => {
    try {
        const contract = await productContract();
        const balance = await contract.methods.balanceOf(
            req.params.address
        ).call();
        return res.json({
            data: Number(balance)
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const sendProduct = async (req, res) => {
    try {
        const contract = await productContract();
        const block = await web3.eth.getBlock("latest");
        await contract.methods.safeTransferFrom(
            req.body.sender_address,
            req.body.receiver_address,
            req.body.product_id
        ).send({
            from: req.body.sender_address,
            gas: block.gasLimit
        })

        return res.json({
            message: 'product sent'
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const getProductInfo = async (req, res) => {
    try {
        const contract = await productContract();
        const owner = await contract.methods.ownerOf(
            req.params.product_id
        ).call();
        const url = await contract.methods.tokenURI(
            req.params.product_id
        ).call();
        return res.json({
            data: {
                owner,
                url
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const destroyProduct = async (req, res) => {
    try {
        const contract = await productContract();
        const block = await web3.eth.getBlock("latest");
        await contract.methods.burn(
            req.params.product_id
        ).send({
            from: minterAddress,
            gas: block.gasLimit
        })
        return res.json({
            message: "success"
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export {
    mintProduct,
    getAccountBalance,
    getProductInfo,
    sendProduct,
    getTokenDetails,
    destroyProduct
}