const { Orders } = require ("../models/orders");
const mcdowellConnection = require("../database/connection");

class orderManager{
    
    //getDeliveredDate
    async getDeliveredDate(date){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const today = myConnection.query(`SELECT * FROM orders WHERE order_day = ${date};`)
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
            const history = myConnection.query(`SELECT * FROM orders LIMIT ${rows} ORDER BY desc;`
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
            const activeStatus = myConnection.query(`SELECT * FROM orders WHERE statuss = ${active};`);
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
            const delivery = myConnection.query( `UPDATE orders SET waiter = ${waiter} WHERE order_day = ${order} AND date_order = ${date};`);
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
            const delivery = myConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND LIMIT ${row}  AND waiter = null;` );
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
            const getDay = myConnection.query(`SELECT * FROM orders WHERE order_day = ${orderDay} ;`)
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
            const delivery = myConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND order_day = ${orderDay} AND waiter = ${waiter};`);
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
            const waiters = myConnection.query(`SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND waiter = ${waiter};`); 
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
            const kitchenProcess = myConnection.query(`UPDATE orders SET statuss = ${status} WHERE uuid_menu = ${uuid_menu};`);
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
            const newOrder = myConnection.query(`INSERT INTO orders (serial_order, order_day, uuid_menu, uuid_user, menu_num, statuss, chef, waiter, order_notes, date_order) (${data.serial_order},${data.order_day},${data.uuid_menu},${data.uuid_user},${data.menu_num},${data.statuss},${data.chef},${data.waiter},${data.order_notes},${data.date_order});`)
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
            const updateOrder = myConnection.query(`UPDATE orders SET statuss=${statuss} WHERE order_day = ${order} AND date_order = ${date}`)
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
            const menuStatus = myConnection.query(`SELECT * FROM orders WHERE statuss = ${statuss} AND date_order =${date};`);
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
            const orderCook = myConnection.query(`UPDATE orders SET chef = ${cook}, statuss = ${kitchen} WHERE uuid_menu = ${id};`);
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
            const petition = myConnection.query(`Select * FROM orders WHERE date_order = ${date} AND statuss = ${kitchen};`)
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
            const petition = myConnection.query(`UPDATE orders SET statuss=${statuss} WHERE uuid_menu = ${id_menu};`)
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

}

module.exports = orderManager