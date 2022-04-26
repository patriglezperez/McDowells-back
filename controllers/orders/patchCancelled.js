
const ordersManager = require('../../managers/ordersManager');

async function patchCancelled(req, res) {
    try {
        const orders = new ordersManager;
        const updateMenu = await orders.updateByOrderDayUuiMenu(req.params.orderDay);
        if (updateMenu) {
            res.json({"updateMenu": updateMenu});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = patchCancelled;