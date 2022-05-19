const { Orders } = require ("../models/orders");
const mcdowellConnection = require("../database/connection");

class orderManager{
    
    //getDeliveredDate
    async getDeliveredDate(date){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
<<<<<<< HEAD
            const today = myConnection.query(`SELECT * FROM orders WHERE order_day = '${date}';`)
=======
            const today = await myConnection.query(`SELECT * FROM orders WHERE order_day = '${date}';`)
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
            return today
        } catch (error) {
            return false
        } finally{
            await myConnection.end();
        }
    }

    //getOrderHistory
    async getOrderHistory(rows){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const history = await myConnection.query(`SELECT * FROM orders LIMIT '${rows}' ORDER BY desc;`
            )
        } catch (error) {
            return false
        }finally{
            await myConnection.end();
        }
    }

    //getStatus
    async getByStatus(active){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const activeStatus = await myConnection.query(`SELECT * FROM orders WHERE statuss = '${active}';`);
            return activeStatus
        } catch (error) {
            return false
        } finally{
            await myConnection.end();
        }
    }

    //sub function --> getDelivering
    async patchDeliveryDateWaiter(date, order, waiter){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const delivery = await myConnection.query(`UPDATE orders SET waiter = '${waiter}' WHERE order_day = '${order}' AND date_order = '${date}';`);
            return delivery;
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    } 

    //getDelivering
    async assignDelivering(date, statuss, row){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const delivery = await myConnection.query(`SELECT * FROM orders WHERE date_order = '${date}' AND statuss = '${statuss}' AND LIMIT '${row}'  AND waiter = null;` );
            return delivery;
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    //getOrder
    async getOrderByDay(orderDay){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const getDay = await myConnection.query(`SELECT * FROM orders WHERE order_day = '${orderDay}' ;`)
            return getDay
        } catch (e) {
            return false
        }finally{
            myConnection.end()
        }
    }

    //
    async patchOrderHistory(date, orderDay, waiter){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const delivery = await myConnection.query( `SELECT * FROM orders WHERE date_order = '${date}' AND order_day = '${orderDay}' AND waiter = '${waiter}';`);
            return delivery;
        } catch (error) {
            return false
        } finally{
            myConnection.end()
        }
    }

    //sub function --> getDelivering
    async getStatusWaiter(date,statuss, waiter){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const waiters = await myConnection.query(`SELECT * FROM orders WHERE date_order = '${date}' AND statuss = '${statuss}' AND waiter = '${waiter}';`); 
            return waiters
        } catch (error) {
            return false
        } finally{
            myConnection.end()
        }
    }

    //getKitchenProcess
    async patchKitchenProcess(uuid_menu, status){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const kitchenProcess = await myConnection.query(`UPDATE orders SET statuss = '${status}' WHERE uuid_menu = '${uuid_menu}';`);
            return kitchenProcess
        } catch (error) {
            return false
        } finally{
            myConnection.end()
        }
    }

    //postNewOrder
    async postNewOrder(data){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
<<<<<<< HEAD
            const newOrder = await myConnection.query(`INSERT INTO orders (serial_order, order_day, uuid_menu, uuid_user, menu_num, statuss, chef, waiter, order_notes, date_order) VALUES('${data.serial_order}','${data.order_day}','${data.uuid_menu}','${data.uuid_user}','${data.menu_num}','${data.statuss}','${data.chef}','${data.waiter}','${data.order_notes}','${data.date_order}');`)
=======
            const newOrder = await myConnection.query(`INSERT INTO orders (serial_order, order_day, uuid_menu, uuid_user, menu_num, statuss, chef, waiter, order_notes, date_order) ('${data.serial_order}','${data.order_day}','${data.uuid_menu}','${data.uuid_user}','${data.menu_num}','${data.statuss}','${data.chef}','${data.waiter}','${data.order_notes}','${data.date_order}');`)
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
            return newOrder
        } catch (error) {
            return false
        } finally{
            myConnection.end()
        }
    }


    async putStatus(order, date, statuss){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
<<<<<<< HEAD
            const updateOrder = myConnection.query(`UPDATE orders SET statuss='${statuss}' WHERE order_day = '${order}' AND date_order = '${date}';`)
=======
            const updateOrder = await myConnection.query(`UPDATE orders SET statuss='${statuss}' WHERE order_day = '${order}' AND date_order = '${date}'`)
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
            return updateOrder
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    //sub function -->getKitchenProcess
    async getMenuByStatus(statuss, date){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
<<<<<<< HEAD
            const menuStatus = myConnection.query(`SELECT * FROM orders WHERE statuss = ${statuss} AND date_order ='${date}';`);
=======
            const menuStatus = await myConnection.query(`SELECT * FROM orders WHERE statuss = '${statuss}' AND date_order ='${date}';`);
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
            return menuStatus;
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    async patchOrderCook(id, kitchen, cook){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const orderCook = await myConnection.query(`UPDATE orders SET chef = '${cook}', statuss = '${kitchen}' WHERE uuid_menu = '${id}';`);
            return orderCook;
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    //getKitchen
    async getByDateByStatus(date, kitchen){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const petition = await myConnection.query(`Select * FROM orders WHERE date_order = '${date}' AND statuss = '${kitchen}';`)
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    //GetKitchenprocess
    async changeMenuSituation(id_menu, statuss){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const petition = await myConnection.query(`UPDATE orders SET statuss='${statuss}' WHERE uuid_menu = '${id_menu}';`)
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    //patchCancelled
    async patchCancelled (){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const patchStat = myConnection.query(``)
        } catch (error) {
            
        } finally{
            myConnection.end()
        }
    }

    //patchFinish
    async patchFinish (){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const patchStat = myConnection.query(``)
        } catch (error) {
            
        } finally{
            myConnection.end()
        }
    }

    //patchFinish
    async patchPaused(){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const patchStat = myConnection.query(``)
        } catch (error) {
            
        } finally{
            myConnection.end()
        }
    }

}

module.exports = orderManager