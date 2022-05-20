const ordersManager = require('../../manager/orders');
// We recover the next available order day.
async function recoverOrderDay(orders) {
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    const orderDaySelect = await orders.getDeliveredDate(dateDayNow);
    // If you don't have orders that day we start one
    const orderDay = orderDaySelect ? orderDaySelect.length + 1 : 1; 
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
        console.log('Aqui que hay??',ordersManager)
        const orders = new ordersManager;
        console.log('Aqui debe estar presentando la info:',orders)
        const { order } = req.body;
        console.log('Que es esta mierda:', req.body)
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
