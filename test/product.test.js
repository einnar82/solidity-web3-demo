const Product = artifacts.require("Product");

contract('Product', (accounts) => {
    let contract

    before(async () => {
        contract = await Product.deployed();
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
        assert.equal(name, 'Collectible');
    })

    it('has a symbol', async () => {
        const symbol = await contract.symbol();
        assert.equal(symbol, 'COL');
    })
});
