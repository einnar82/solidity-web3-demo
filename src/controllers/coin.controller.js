import {
    coinContract,
    minterAddress,
    web3
} from "../config";

const mintCoin = async (req, res, next) => {
    try {
        const contract = await coinContract()
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
        const contract = await coinContract()
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
        const contract = await coinContract()
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
        const contract = await coinContract()
        const safeAmount = web3.utils.toWei(req.body.amount.toString(), 'ether')
        const amount = web3.utils.toBN(safeAmount)
        await contract.methods.transfer(req.body.receiver_address, amount).send({
            from: req.body.sender_address
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
        const contract = await coinContract()
        const approved = await contract.methods.approve(req.body.spender, req.body.amount).call();

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
        const contract = await coinContract()
        const allowance = await contract.methods.allowance(req.body.owner, req.body.spender).call();
        return res.json({
            balance: Number(allowance)
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
    approveAmount,
    allowance
}