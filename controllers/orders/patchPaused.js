const orderManager = require('../../manager/orders');;

async function patchPaused(req, res) {
    try {
        const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
        const orders = new orderManager;
        const updateMenu = await orders.putStatus(req.params.orderDay, dateDayNow, "Paused");
        if (updateMenu) { 
            res.json({"updateMenu": updateMenu});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = patchPaused;