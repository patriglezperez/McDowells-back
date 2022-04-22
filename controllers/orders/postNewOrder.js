const ordersManager = require('../../managers/ordersManager');

/// process
async function postNewOrder(req, res) {
    try {
        const orders = new ordersManager;
        const newOrders = req.params.Order;
        let checkOrders = await orders.check(newOrders.Id);
        if (checkOrders) { /// ckeck is empty
            const oneOrders = await orders.create(newOrders);
            if (oneOrders !== 'false') {
                res.status(201).json(); /// check res
            } else {
                res.status(204).json("Error"); /// check res
            }
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = postNewOrder;