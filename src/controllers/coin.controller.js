import {
    getCoinContract,
    minterAddress,
    web3
} from "../config";

const mintCoin = async (req, res, next) => {
    try {
        const contract = await getCoinContract();
        const safeAmount = web3.utils.toWei(req.body.amount.toString(), 'ether');
        const amount = web3.utils.toBN(safeAmount)
        await contract.methods.mint(req.body.address, amount).send({
            from: minterAddress
        });
        return res.json({
            message: 'success'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const totalSupply = async (req, res, next) => {
    try {
        const contract = await getCoinContract();
        const totalSupplyRaw = await contract.methods.totalSupply().call();
        const totalSupply = web3.utils.fromWei(totalSupplyRaw, 'ether');
        res.json({
            totalSupply: Number(totalSupply)
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}

const accountBalance = async (req, res, next) => {
    try {
        const contract = await getCoinContract();
        const balanceRaw = await contract.methods.balanceOf(req.params.address).call();
        const balance = web3.utils.fromWei(balanceRaw, 'ether');
        return res.json({
            balance: Number(balance)
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const transferCoin = async (req, res) => {
    try {
        const contract = await getCoinContract();
        const safeAmount = web3.utils.toWei(req.body.amount.toString(), 'ether')
        const amount = web3.utils.toBN(safeAmount)
        await contract.methods.transfer(req.body.receiver, amount).send({
            from: minterAddress
        });
        return res.json({
            message: 'balance transferred.'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const approveAmount = async (req, res) => {
    try {
        const contract = await getCoinContract();
        const safeAmount = web3.utils.toWei(req.body.amount.toString(), 'ether')
        const amount = web3.utils.toBN(safeAmount)
        const approved = await contract.methods.approve(req.body.spender, amount).send({
            from: req.body.owner
        });

        return res.json({
            message: approved
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const allowance = async (req, res, next) => {
    try {
        const contract = await getCoinContract();
        const allowance = await contract.methods.allowance(req.body.owner, req.body.spender).call();
        const safeAmount = web3.utils.fromWei(allowance, 'ether')
        return res.json({
            balance: Number(safeAmount)
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const transferFrom = async (req, res) => {
    try {
        const contract = await getCoinContract();
        const safeAmount = web3.utils.toWei(req.body.amount.toString(), 'ether')
        const amount = web3.utils.toBN(safeAmount)
        await contract.methods.transferFrom(
            req.body.sender, 
            req.params.receiver,
            amount
        ).call({
            from: req.body.sender
        });
        return res.json({
            message: "transfer has been sent"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export {
    mintCoin,
    totalSupply,
    accountBalance,
    transferCoin,
    transferFrom,
    approveAmount,
    allowance
}