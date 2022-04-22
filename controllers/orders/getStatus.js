
const ordersManager = require('../../managers/ordersManager');


async function getStatus(req, res) {
    try {
        const orders = new ordersManager;
        const activeOrders = await orders.getByStatus("Active");
        if (activeOrders !== []) {
            res.json({"activeOrders": activeOrders});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getStatus;