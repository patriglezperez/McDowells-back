const ordersManager = require('../../managers/ordersManager');

/// process
async function postNewOrder(req, res) {
    // We recover the next available order day.
    async function recoverOrderDay() {
        const dateDayNow = (new Date()).toISOString().split('T')[0]; // YYYY-MM-DD now
        const orderDaySelect = await orders.getOrderDayByDate(dateDayNow);
        const orderDay = (orderDaySelect !== 'false') ? orderDaySelect.length + 1 : 1; /// revisar empty
        return orderDay;
    }

    // we retrieve order day and insert the order
    async function checkOrders(newOrders) {
        let checkOrdersDay; 
        const orderDay = await recoverOrderDay(); // recover the next available order day.
        /* if (newOrders.length === 1) {
            checkOrdersDay = await orders.check(newOrders[0].Id, orderDay);
            if (checkOrdersDay !== 'false') {
                newOrders[0].orderDay = orderDay; // Add order day to objeto order menu.
                return newOrders;
            } else {
                return false; // order day plus identifier already exists.
            }
        } else {
            for (i=0; newOrders.length > i; i++) {
                checkOrdersDay = await orders.check(newOrders[i].Id, orderDay);
            }
        }
        let checkOrders = await orders.check(newOrders.Id); */
        for (i=0; newOrders.length > i; i++) {
            newOrders[i].orderDay = orderDay;
            checkOrdersDay.push(await orders.insertOrders(newOrders[i]))
        }
        /* if (checkOrdersDay.includes('false')) {
            return false;
        } else {
            return newOrders;
        } */
        return (checkOrdersDay.includes('false')) ? 'false' : newOrders;
    }

    try {
        const orders = new ordersManager;
        const newOrders = req.params.Order;  
        const statuOrder = await checkOrders(newOrders); // 

        if (statuOrder) {
            res.status(201).json({'orders': statuOrder}); /// check res
        } else {
            res.status(204).json("Error"); /// check res
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = postNewOrder;