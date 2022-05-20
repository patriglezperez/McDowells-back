const orderManager = require('../../manager/orders');

async function getByStatus(req, res){
    try {
        console.log("PINTAAA", orderManager)
        const orders = new orderManager;
        console.log('what is this', orders)
        const activeOrders = await orders.getByStatus(req.params.status);
        console.log("what is this Active orders:", req.params)
        if (activeOrders) {
            res.json({"activeOrders": activeOrders});
        } else {
            res.status(404).json("Not found msmafmsmfsmfm");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getByStatus;
