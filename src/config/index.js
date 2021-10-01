import * as dotenv from "dotenv";
import Web3 from 'web3';
import Product from '../abis/Product.json'
import Coin from '../abis/Coin.json'

dotenv.config();

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const networkId = async () => await web3.eth.net.getId()
const productNetworkData = async () => Product.networks[await networkId()];
const productContractAddress = async () => {
    const networkData = await productNetworkData()
    return networkData.address;
}
const productContract = async () => new web3.eth.Contract(Product.abi, await productContractAddress());

const coinNetworkData = async () => Coin.networks[await networkId()]
const coinContractAddress = async () => {
    const network = await coinNetworkData()
    return network.address;
}
const coinContract = async () => new web3.eth.Contract(Coin.abi, await coinContractAddress())

const minterAddress = process.env.MINTER_ADDRESS || '0x76759176cf7cD28de1A8FC2BbdDfeFbbeAD9Ee0D';
const nftStorageKey = process.env.NFT_STORAGE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE0MEY2NDIxMjY1NjVFNWYwZjc0MDNiOTdENjgzZTFkMUMzM0NhMTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMjkwNTAyNDUxNSwibmFtZSI6Im5mdC10ZXN0In0.uU2uQfXl8xG6wRf6BTXQo-tBOCCSSGlIi0PikWc64yY';

export {
    web3,
    productContract,
    productNetworkData,
    minterAddress,
    nftStorageKey,
    coinContract
}