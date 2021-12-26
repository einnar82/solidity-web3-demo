const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const Coin = artifacts.require("Coin");

contract('Coin', (accounts) => {
    let contract

    before(async () => {
        contract = await Coin.deployed();
    });

    it('deploys successfully', async () => {
        const address = contract.address;
        assert.notStrictEqual(address, '');
        assert.notStrictEqual(address, null);
        assert.notStrictEqual(address, undefined);
        assert.notStrictEqual(address, 0x0);
    })

    it('has a name', async () => {
        const name = await contract.name();
        assert.equal(name, 'PHP Coin');
    })

    it('has a symbol', async () => {
        const symbol = await contract.symbol();
        assert.equal(symbol, 'PHPC');
    })

    it('has a total supply', async () => {
        const supply = await contract.totalSupply();
        const totalSupply = web3.utils.fromWei(supply, 'ether');
        assert.equal(totalSupply, 10);
    })

});