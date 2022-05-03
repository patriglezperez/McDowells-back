const ordersManager = require("../../managers/ordersManager");
const menuManager = require("../../managers/menuManager");



async function checkExecutionTime(info, orders) {   
    const timeNow = new Date().getTime();

    // if finished we update the menu
    if (info.chef[1] > timeNow) {
        await orders.changeMenuSituation(info.uuid_menu, "delivering"); /// verificar campo
        return true
    } else {
        return false
    }
}

async function inKitchen(idCook, orders) {

    let menuStatus = {"busy": false, "data": ""}
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now

    // we verify the orders in the kitchen only those of the day
    const inKitchenArray = await orders.getByDateByStatus(dateDayNow, "kitchen");
    if (inKitchenArray) {       
        for (i=0; inKitchenArray.length > i; i++) {
            // we verify if the menu is finished its preparation
            const finish = await checkExecutionTime(inKitchenArray[i], orders)
            // we check if the cook is busy or not
            if ((inKitchenArray[i].chef[0] === idCook) & !finish) {
                menuStatus.busy = true;
                menuStatus.data = inKitchenArray[i];
            }
        }
    }
    return menuStatus;
}

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

async function getKitchenProcess(req, res) {
    const orders = new ordersManager;
    const idCook = 'params or body'; /// revisar
    const menuStatus = inKitchen(idCook, orders);
    let deliveredDay;
    if (!menuStatus.busy) {
        deliveredDay = await assignKitchenMenu(idCook, orders); /// ajustar
    }
    
    try {
        if (deliveredDay) {
            res.json({"deliveredDay": deliveredDay});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getKitchenProcess;