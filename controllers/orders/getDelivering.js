const ordersManager = require("../../managers/ordersManager");



/**
 * we verify if the Waiter exists or not
 * @param {string} idWaiter uuid Waiter
 * @returns {boolean} 
 */
 async function checkWaiter(idWaiter) {
    const staff = new staffManager;
    /// si solo chekeamos por id de staff sacar la funcion de aqui meterlo en servicio
    /// para usarlo en getKitchenProcess y no tener codigo duplicado
    const existsWaiter = await staff.checkFuckCook(idWaiter);
    if (existsWaiter) {
        return true
    } else {
        return false
    }
}

/**
 * we check the status and update the orders in the Delivering
 * @param {string} idWaiter uuid Waiter
 * @param {object} orders connection object for order table
 * @returns {object} waiterStatus
 */
async function inDelivering(idWaiter, orders) {
    let waiterStatus = {"busy": false, "data": ""}
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now

    // we verify the orders in the delivering only those of the day
    const inDeliveringArray = await orders.getByDateByStatus(dateDayNow, "delivering", idWaiter);
    if (inDeliveringArray) {       
        waiterStatus.busy = true;
        waiterStatus.data = inDeliveringArray;
    }
    return waiterStatus;
}

/**
 * We process the updating of Deliver processes
 * @param {string} idWaiter uuid Waiter
 * @param {object} orders connection object for order table
 * @returns {object} array of orders or null
 */
async function assignDelivering(idWaiter, orders) {
    let deliveredDay;
    // we retrieve a record of the day in delivery status without assigned waiter
    const inDeliveringFree = await orders.getByDateByStatus(dateDayNow, "delivering", row=1);
    if (inDeliveringFree) {
        // we assign the waiter to the entire order
        deliveredDay = await orders.getByDateByStatus(dateDayNow, inDeliveringFree.orderDay, idWaiter);
    } else {
        deliveredDay = ""; 
    }
    return deliveredDay;
}

/**
 * We process the updating of Deliver processes
 * /// es json o objeto ??? cual es la correcto ???
 * @param {json} req
 * @returns {json} res
 */
async function getDelivering(req, res) {
    try {
        let deliveredDay;
        // we retrieve the uuid associated with the waiter and his availability status
        const { waiter, status } = req.body;
        // we check if the waiter exists
        const existsWaiter = await checkWaiter(waiter); 

        if (existsWaiter) {
            const orders = new ordersManager;

            // we check the menus in the delivered to see if our waiter is busy
            const waiterStatus = inDelivering(waiter, orders);

            // if the waiter is unoccupied we assign him an order, 
            // if not we send him the entire updated order
            if (!waiterStatus.busy && (status === "available")) {
                deliveredDay = await assignDelivering(waiter, orders); /// ajustar
            } else {
                deliveredDay = await orders.getByDateByStatus(dateDayNow, waiter); /// ajustar
            }
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