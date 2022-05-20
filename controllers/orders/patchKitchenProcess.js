const orderManager = require("../../manager/orders");
const menuManager = require("../../manager/menu");
const staffManager = require("../../manager/staff");


/**
 * we check if the estimate of completion of the menu and we update it
 * @param {object} info menu information we are reviewing
 * @param {object} orders connection object for order table
 * @returns {boolean}
 */
async function checkExecutionTime(info, orders) {   
    const timeNow = new Date().getTime();

    // if finished we update the menu
    const timeFinish = info.order_notes.split(',')
    if (timeFinish[1] < timeNow) {
        /// necesita el await??

        await orders.changeMenuSituation(info.uuid_menu, "delivering"); /// verificar campo
        return true
    } else {
        return false
    }
}

/**
 * we check the status and update the orders in the kitchen
 * @param {string} idCook uuid cook
 * @param {object} orders connection object for order table
 * @returns {object} cookStatus
 */
async function inKitchen(idCook, orders) {

    let cookStatus = {"busy": false, "data": ""}
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now

    // we verify the orders in the kitchen only those of the day
    const inKitchenArray = await orders.getByDateByStatus(dateDayNow, "kitchen");
    //console.log('inKitchen--inKitchenArray:', inKitchenArray.rows);
    if (inKitchenArray.rows) {       
        for (i=0; inKitchenArray.rows.length > i; i++) {
            // we verify if the menu is finished its preparation
            const finish = await checkExecutionTime(inKitchenArray.rows[i], orders)
            // we check if the cook is busy or not
            if ((inKitchenArray.rows[i].chef === idCook) & !finish) {
                cookStatus.busy = true;
                cookStatus.data = inKitchenArray.rows[i];
            }
        }
    }
    return cookStatus;
}

/**
 * we assign a menu to our cook
 * @param {string} idCook uuid cook
 * @param {object} orders connection object for order table
 * @returns {object} deliveredDay = updated order table record to cook
 */
async function assignKitchenMenu(idCook, orders) {
    /// proceso recuperar menu en process
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
    //console.log('assignKitchenMenu:', idCook)
    const info = await orders.getMenuByStatus("processing", dateDayNow); /// poner el puto nombre q quieras
    //console.log('assignKitchenMenu--info:', info.rows);
    /// proceso menus para pillar tiempo de duracion
    const menu = new menuManager;
    const processingTime = await menu.pickTime(info.rows[0].menu_num);
    //console.log('assignKitchenMenu--processingTime:', processingTime.rows[0].time_process);
    const timeNow = new Date();
    /// añadir time
    const completionTime = timeNow.setMinutes(timeNow.getMinutes() + processingTime.rows[0].time_process);
    const cook = [idCook, completionTime];
    //console.log('assignKitchenMenu--cook:', cook)
    /// actualizar menu a cocina, añadimos en chef [uuid_chef, tiempo_q_estara_listo]
    const deliveredDay = await orders.patchOrderCook(info.rows[0].uuid_menu, "kitchen", cook); /// verificar campo
    //console.log('assignKitchenMenu--deliveredDay:', deliveredDay)
    return deliveredDay;
}

/**
 * we verify if the cook exists or not
 * @param {string} idCook uuid cook
 * @returns {boolean} 
 */
async function checkCook(idCook) {
    //console.log('checkCook:', idCook);
    const staff = new staffManager;
    const existsCook = await staff.getStaffMember(idCook);
    if (existsCook) {
        return true
    } else {
        return false
    }
}

/**
 * We process the updating of kitchen processes
 * @param {object} req
 * @returns {object} res
 */
async function patchKitchenProcess(req, res) {
    //console.log('puto patchKitchenProcess');
    //console.log('puto' ,req.body);
    try {
        let deliveredDay;
        let cookStatus;
        const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now
        // we retrieve the uuid associated with the cook and his availability status
        const { cook, status } = req.body;
        // we check if the cook exists
        const existsCook = await checkCook(cook);
        //console.log('patchKitchenProcess--existsCook:', existsCook);
        if (existsCook) {
            const orders = new orderManager;

            // we check the menus in the kitchen to see if our cook is busy
            cookStatus = await inKitchen(cook, orders);
            //console.log('patchKitchenProcess--cookStatus:' , cookStatus, status)
            // if it is not assigned to any menu and it is available we assign a menu
            if (!cookStatus.busy && !status) {
                deliveredDay = await assignKitchenMenu(cook, orders); /// ajustar
            } /* else {
                // we recover the orders in the kitchen only those of the day
                console.log('patchKitchenProcess--false:' , cookStatus, status, dateDayNow);
                /// solo el asignado al cocinero ???
                deliveredDayNow = await orders.getByDateByStatus(dateDayNow, "kitchen"); 
                deliveredDay = deliveredDayNow.rows.find((e) => {e.cook[0] === cook})
                console.log('patchKitchenProcess--deliveredDay:' ,deliveredDay)
            } */
        }

        if (existsCook) {
            if (cookStatus.busy) {
                // tiene ya un pedido en cocina
                res.json({"orders": cookStatus.data});
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
        console.log('err:', err)
        res.status(500).json("Server Error");
    }
}

module.exports = patchKitchenProcess;