//orden de comida
const orderManager = require('../../manager/orders');

async function getOrder(req, res) {
    try {
        const orders = new orderManager;
        const oneOrders = await orders.getOrderByDay(req.params.id);
        if (oneOrders) {
            res.json({"oneOrders": oneOrders});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getOrder;
