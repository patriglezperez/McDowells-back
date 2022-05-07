const ordersManager = require("../../manager/orders");
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
    if (info.chef[1] > timeNow) {
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
    if (inKitchenArray) {       
        for (i=0; inKitchenArray.length > i; i++) {
            // we verify if the menu is finished its preparation
            const finish = await checkExecutionTime(inKitchenArray[i], orders)
            // we check if the cook is busy or not
            if ((inKitchenArray[i].chef[0] === idCook) & !finish) {
                cookStatus.busy = true;
                cookStatus.data = inKitchenArray[i];
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
    const info = await orders.selectInOnlyOne("processing"); /// poner el puto nombre q quieras
    /// proceso menus para pillar tiempo de duracion
    const menu = new menuManager;
    const processingTime = await menu.pickTime();
    const timeNow = new Date().getTime();
    /// añadir time
    const completionTime = timeNow.setMinutes(timeNow.getMinutes() + processingTime);
    const cook = [idCook, completionTime];
    /// actualizar menu a cocina, añadimos en chef [uuid_chef, tiempo_q_estara_listo]
    const deliveredDay = await orders.forKitchen(info.uuid_menu, "kitchen", cook); /// verificar campo
    return deliveredDay;
}

/**
 * we verify if the cook exists or not
 * @param {string} idCook uuid cook
 * @returns {boolean} 
 */
async function checkCook(idCook) {
    const staff = new staffManager;
    const existsCook = await staff.checkingCook(idCook);
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
async function getKitchenProcess(req, res) {
      
    try {
        let deliveredDay;
        // we retrieve the uuid associated with the cook and his availability status
        const { cook, status } = req.body;
        // we check if the cook exists
        const existsCook = await checkCook(cook);

        if (existsCook) {
            const orders = new ordersManager;

            // we check the menus in the kitchen to see if our cook is busy
            const cookStatus = inKitchen(cook, orders);
            
            // if it is not assigned to any menu and it is available we assign a menu
            if (!cookStatus.busy && !status) {
                deliveredDay = await assignKitchenMenu(cook, orders); /// ajustar
            } else {
                // we recover the orders in the kitchen only those of the day
                deliveredDay = await orders.getByDateByStatus(dateDayNow, "kitchen");
            }
        }

        if (deliveredDay && existsCook) {
            res.json({"deliveredDay": deliveredDay});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getKitchenProcess;