const ordersManager = require("../../managers/ordersManager");
const menuManager = require("../../managers/menuManager");

async function checkExecutionTime(info) {
    let timeNow = new Date();
    // calacular tiempo de procesamiento del menu

    if (info.date.getTime() < (timeNow + TIEMPO_DE_PROCESAMIENTO)) {
        // cambiar a reparto camareros el menu
        return true
    } else {
        return false
    }
}

async function inKitchen(idCook) {
    let menuStatus = {"busy": false, "data": ""}
    const dateDayNow = (new Date()).toISOString().split("T")[0]; // YYYY-MM-DD now

    // we verify the orders in the kitchen only those of the day
    const inKitchenArray = await orders.getByDateByStatus(dateDayNow, "kitchen");
    if (inKitchenArray) {       
        for (i=0; inKitchenArray.length > i; i++) {
            // we verify if the menu is finished its preparation
            const finish = await checkExecutionTime(inKitchenArray[i])
            // we check if the cook is busy or not
            if ((inKitchenArray[i].chef[0] === idCook) & !finish) {
                menuStatus.busy = true;
                menuStatus.data = inKitchenArray[i];
            }
        }
    }
    return menuStatus;
}

async function getKitchenProcess(req, res) {
    
    const menuStatus = inKitchen(idCook);

    if (!menuStatus.busy) {
        assignKitchenMenu();
    }
    
    try {
        const orders = new ordersManager; /// ver donde encaja mejor 
        
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