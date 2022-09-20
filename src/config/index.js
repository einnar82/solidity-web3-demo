const dotenv = require('dotenv');
const Web3 = require('web3');
const Coin = require('../abis/Coin.json');

dotenv.config();

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const getNetworkId = async () => await web3.eth.net.getId()

const getCoinNetworkData = async () => Coin.networks[await getNetworkId()]
const getCoinContractAddress = async () => {
    const network = await getCoinNetworkData()
    return network.address;
}
const getCoinContract = async () => new web3.eth.Contract(Coin.abi, await getCoinContractAddress())

const minterAddress = process.env.MINTER_ADDRESS || '0x687484d9c00f0D0C0C65e2893B8019284822F21D';

module.exports = {
    web3,
    minterAddress,
    getCoinContract
}