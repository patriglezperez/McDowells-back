const ordersManager = require('../../manager/orders');
// We recover the next available order day.
async function recoverOrderDay(orders) {
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    const orderDaySelect = await orders.getDeliveredDate(dateDayNow);
    const orderDay = (orderDaySelect !== "false") ? orderDaySelect.length + 1 : 1; /// revisar empty
    return orderDay;
}

// we retrieve order day and insert the order
async function checkOrders(newOrders, orders) {
    let checkOrdersDay; 
    const orderDay = await recoverOrderDay(orders); // recover the next available order day.

    for (i=0; newOrders.length > i; i++) {
        newOrders[i].orderDay = orderDay;
        checkOrdersDay.push(await orders.insertOrders(newOrders[i]))
    }

    return (checkOrdersDay.includes("false")) ? "false" : newOrders;
}

/// process
async function postNewOrder(req, res) {
    try {
        const orders = new ordersManager;
        const { newOrders } = req.body;
        const statuOrder = await checkOrders(newOrders, orders); // 

        if (statuOrder) {
            res.status(201).json({"orders": statuOrder}); /// check res
        } else {
            res.status(204).json("Error"); /// check res
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = postNewOrder;
