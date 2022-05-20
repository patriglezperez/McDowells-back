const orderManager = require('../../manager/orders');

async function getDeliveredDate(req, res) {
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    try {
        const orders = new orderManager;
        const deliveredDay = await orders.getOrderByDay(dateDayNow);
        if (deliveredDay) {
            res.json({"deliveredDay": deliveredDay});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getDeliveredDate;
