const orderManager = require('../../manager/orders');
const staffManager = require('../../manager/staff');



/**
 * we verify if the Waiter exists or not
 * @param {string} idWaiter uuid Waiter
 * @returns {boolean} 
 */
 async function checkWaiter(idWaiter) {
    const staff = new staffManager;
    /// si solo chekeamos por id de staff sacar la funcion de aqui meterlo en servicio
    /// para usarlo en getKitchenProcess y no tener codigo duplicado
    const existsWaiter = await staff.getStaffMember(idWaiter);
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
    const inDeliveringArray = await orders.getStatusWaiter(dateDayNow, "delivering", idWaiter);
    //console.log('inDelivering-inDeliveringArray:', inDeliveringArray);
    if (inDeliveringArray.rows.length > 0) {
        //console.log('chupame la polla', inDeliveringArray.rows);       
        waiterStatus.busy = true;
        waiterStatus.data = inDeliveringArray.rows;
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
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    let deliveredDay;
    // we retrieve a record of the day in delivery status without assigned waiter
    const inDeliveringFree = await orders.assignDelivering(dateDayNow, "delivering", row=1);
    
    if (inDeliveringFree.rows) {
        //console.log('inDeliveringFree:', inDeliveringFree.rows);
        // we assign the waiter to the entire order
        deliveredDay = await orders.patchDeliveryDateWaiter(dateDayNow, inDeliveringFree.rows[0].order_day, idWaiter);
        //console.log('deliveredDay:', deliveredDay);
    } else {
        deliveredDay = ""; 
    }
    return deliveredDay;
}

/**
 * We process the updating of Deliver processes
 * @param {json} req
 * @returns {json} res
 */
async function patchDelivering(req, res) {
    console.log('req.body-getDelivering:', req.body);
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    try {
        let deliveredDay;
        let waiterStatus;
        // we retrieve the uuid associated with the waiter and his availability status
        //console.log('req.body-getDelivering:', req.body);
        const { waiter, status } = req.body;
        // we check if the waiter exists
        const existsWaiter = await checkWaiter(waiter); 
        //console.log('existsWaiter-getDelivering:', existsWaiter);
        if (existsWaiter) {
            const orders = new orderManager;

            // we check the menus in the delivered to see if our waiter is busy
            waiterStatus = await inDelivering(waiter, orders);
            //console.log("patchDelivering--waiterStatus:", waiterStatus);
            // if the waiter is unoccupied we assign him an order, 
            // if not we send him the entire updated order
            if (!waiterStatus.busy && !status) {
                deliveredDay = await assignDelivering(waiter, orders);
                //console.log('deliveredDay:', deliveredDay);
            } /* else {
                deliveredDay = await orders.getStatusWaiter(dateDayNow, "delivering", waiter); 
            } */
        }

        if (existsWaiter) {
            //console.log("orders", deliveredDay, waiterStatus);
            if (waiterStatus.busy) {
                // tiene ya un pedido en cocina
                res.json({"orders": waiterStatus.data});
            } else {
                if (!status) {
                    // se le asigna un pedido
                    res.json({"orders": deliveredDay.rows});
                } else {
                    // no tiene pedido pero no esta trabajando
                    res.json({"orders": null});
                }
            }  
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
}

module.exports = patchDelivering; 