
const ordersManager = require("../../managers/ordersManager");

async function getDeliveredDate(req, res) {
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    
    try {
        const orders = new ordersManager;
        const deliveredDay = await orders.getByDate(dateDayNow);
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