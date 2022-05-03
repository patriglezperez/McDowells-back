const ordersManager = require("../../managers/ordersManager");

async function getDelivering(req, res) {
    const orders = new ordersManager;
    const idCook = 'params or body'; /// revisar
    const menuStatus = inKitchen(idCook, orders);
    let deliveredDay;
    if (!menuStatus.busy) {
        deliveredDay = await assignKitchenMenu(idCook, orders); /// ajustar
    }

    try {
        if (deliveredDay) {
            res.json({"deliveredDay": deliveredDay});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getDelivering; 