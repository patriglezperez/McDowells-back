
const ordersManager = require('../../manager/orders');

async function patchCancelled(req, res) {
    try {
        const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
        const orders = new ordersManager;
        const updateMenu = await orders.updateByOrderDayUuiMenu(req.params.orderDay, dateDayNow, 'Cancelled');
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