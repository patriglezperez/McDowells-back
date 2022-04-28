//orden de comida
const ordersManager = require("../../managers/ordersManager");

async function getOrders(req, res) {
    try {
        const orders = new ordersManager;
        const oneOrders = await orders.getById(req.params.orderDay);
        if (oneOrders) {
            res.json({"oneOrders": oneOrders});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getOrders;