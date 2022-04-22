const ordersManager = require('../../managers/ordersManager');

async function getHistoryOrders(req, res) {
    try {
        const orders = new ordersManager;
        const historyOrders = await orders.getAll(100);
        if (historyOrders !== []) {
            res.json({"historyOrders": historyOrders});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getHistoryOrders;