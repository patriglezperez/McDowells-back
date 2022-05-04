const ordersManager = require("../../managers/ordersManager");



/**
 * we verify if the Waiter exists or not
 * @param {string} idWaiter uuid Waiter
 * @returns {boolean} 
 */
 async function checkWaiter(idWaiter) {
    const staff = new staffManager;
    const existsWaiter = await staff.checkFuckCook(idWaiter);
    if (existsWaiter) {
        return true
    } else {
        return false
    }
}

async function getDelivering(req, res) {
    try {
        let deliveredDay;
        // we retrieve the uuid associated with the waiter and his availability status
        const { waiter, status } = req.body;
        // we check if the waiter exists
        const existsWaiter = await checkWaiter(waiter);

        if (existsWaiter) {
            const orders = new ordersManager;

        }

        if (deliveredDay && existsWaiter) {
            res.json({"deliveredDay": deliveredDay});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getDelivering; 