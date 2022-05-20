const orderManager = require('../../manager/orders');
// We recover the next available order day.
async function recoverOrderDay(orders) {

    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    const orderDaySelect = await orders.getDeliveredDate(dateDayNow);
    // If you don't have orders that day we start one
    const orderDay = orderDaySelect.rows ? orderDaySelect.rows.length + 1 : 1; 

    return orderDay;
}

// we retrieve order day and insert the order
async function checkOrders(newOrders, orders) {

    let checkOrdersDay = [];
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    const orderDay = await recoverOrderDay(orders); // recover the next available order day.

    for (i=0; newOrders.length > i; i++) {
        newOrders[i].order_day = orderDay;
        newOrders[i].date_order = dateDayNow;
        //const resp = await orders.postNewOrder(newOrders[i])
        checkOrdersDay.push(await orders.postNewOrder(newOrders[i]));
    }

    return (checkOrdersDay.includes("false")) ? "false" : newOrders;
}

/// process
async function postNewOrder(req, res) {
    try {
        const orders = new orderManager;
        const { order } = req.body;
        const statusOrder = await checkOrders(order, orders); 

        if (statusOrder) {
            res.status(201).json({"orders": statusOrder}); 
        } else {
            res.status(204).json("Error"); 
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = postNewOrder;
