const orderManager = require('../../manager/orders');

async function getHistoryOrders(req, res) {
    try {
        const orders = new orderManager;
        // Only 100 rows
        const historyOrders = await orders.getOrderHistory(100);
        if (historyOrders) {
            res.json({"historyOrders": historyOrders});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getHistoryOrders;
