import * as dotenv from "dotenv";
import Web3 from 'web3';
import Coin from '../abis/Coin.json'

dotenv.config();

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const networkId = async () => await web3.eth.net.getId()

const coinNetworkData = async () => Coin.networks[await networkId()]
const coinContractAddress = async () => {
    const network = await coinNetworkData()
    return network.address;
}
const coinContract = async () => new web3.eth.Contract(Coin.abi, await coinContractAddress())

const minterAddress = process.env.MINTER_ADDRESS || '0x687484d9c00f0D0C0C65e2893B8019284822F21D';

export {
    web3,
    minterAddress,
    coinContract
}