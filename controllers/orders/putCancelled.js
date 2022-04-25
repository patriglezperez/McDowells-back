
const ordersManager = require('../../managers/ordersManager');

async function putCancelled(req, res) {
    try {
        const orders = new ordersManager;
        const { orderDay, uuidMenu } = req.body; // menu or order ???
        const updateMenu = await orders.updateByOrderDayUuiMenu(orderDay, uuidMenu);
        if (updateMenu !== []) {
            res.json({"updateMenu": updateMenu});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = putCancelled;