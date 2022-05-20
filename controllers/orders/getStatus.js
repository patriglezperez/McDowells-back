const orderManager = require('../../manager/orders');

async function getStatus(req, res){
    console.log("what can i see")
    try {
        const orders = new orderManager;
        const activeOrders = await orders.getStatus(req.params.status);
        if (activeOrders) {
            res.json({"activeOrders": activeOrders});
        } else {
            res.status(404).json("Not found fuuuuuuck");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getStatus;
