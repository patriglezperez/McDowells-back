const { Orders } = require ("../models/orders");
const { mcdowellConnection } = require("../database/connection");

class ordersManager{
    
    //getDeliveredDate
    async getDeliveredDate(date){
        try {
            const today = mcdowellConnection.query(`SELECT * FROM orders WHERE order_day = ${date};`)
            return today
        } catch (error) {
            return false
        } finally{
            await mcdowellConnection.end();
        }
    }

    //getOrderHistory
    async getOrderHistory(rows){
        try {
            const history = mcdowellConnection.query(`SELECT * FROM orders LIMIT ${rows} ORDER BY desc;`
            )
        } catch (error) {
            return false
        }finally{
            await mcdowellConnection.end();
        }
    }

    //getStatus
    async getByStatus(active){
        try {
            const activeStatus = mcdowellConnection.query(`SELECT * FROM orders WHERE statuss = ${active};`);
            return activeStatus
        } catch (error) {
            return false
        } finally{
            await mcdowellConnection.end();
        }
    }

    //sub function --> getDelivering
    async patchDeliveryDateWaiter(date, order, waiter){
        try {
            const delivery = mcdowellConnection.query( `UPDATE orders SET waiter = ${waiter} WHERE order_day = ${order} AND date_order = ${date};`);
            return delivery;
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    } 

    //getDelivering
    async assignDelivering(date, statuss, row){
        try {
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND LIMIT ${row}  AND waiter = null;` );
            return delivery;
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    //getOrder
    async getOrderByDay(orderDay){
        try {
            const getDay = mcdowellConnection.query(`SELECT * FROM orders WHERE order_day = ${orderDay} ;`)
            return getDay
        } catch (e) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    //
    async patchOrderHistory(date, orderDay, waiter){
        try {
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND order_day = ${orderDay} AND waiter = ${waiter};`);
            return delivery;
        } catch (error) {
            return false
        } finally{
            mcdowellConnection.end()
        }
    }

    //sub function --> getDelivering
    async getStatusWaiter(date,statuss, waiter){
        try {
            const waiters = mcdowellConnection.query(`SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND waiter = ${waiter};`); 
            return waiters
        } catch (error) {
            return false
        } finally{
            mcdowellConnection.end()
        }
    }

    //getKitchenProcess
    async patchKitchenProcess(uuid_menu, status){
        try {
            const kitchenProcess = mcdowellConnection.query(`UPDATE orders SET statuss = ${status} WHERE uuid_menu = ${uuid_menu};`);
            return kitchenProcess
        } catch (error) {
            return false
        } finally{
            mcdowellConnection.end()
        }
    }

    //postNewOrder
    async postNewOrder(data){
        try {
            const newOrder = mcdowellConnection.query(`INSERT INTO orders (serial_order, order_day, uuid_menu, uuid_user, menu_num, statuss, chef, waiter, order_notes, date_order) (${data.serial_order},${data.order_day},${data.uuid_menu},${data.uuid_user},${data.menu_num},${data.statuss},${data.chef},${data.waiter},${data.order_notes},${data.date_order});`)
            return newOrder
        } catch (error) {
            return false
        } finally{
            mcdowellConnection.end()
        }
    }


    async putStatus(order, date, statuss){
        try {
            const updateOrder = mcdowellConnection.query(`UPDATE orders SET statuss=${statuss} WHERE order_day = ${order} AND date_order = ${date}`)
            return updateOrder
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    //sub function -->getKitchenProcess
    async getMenuByStatus(statuss, date){
        try {
            const menuStatus = mcdowellConnection.query(`SELECT * FROM orders WHERE statuss = ${statuss} AND date_order =${date};`);
            return menuStatus;
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    async patchOrderCook(id, kitchen, cook){
        try {
            const orderCook = mcdowellConnection.query(`UPDATE orders SET chef = ${cook}, statuss = ${kitchen} WHERE uuid_menu = ${id};`);
            return orderCook;
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    //getKitchen
    async getByDateByStatus(date, kitchen){
        try {
            const petition = mcdowellConnection.query(`Select * FROM orders WHERE date_order = ${date} AND statuss = ${kitchen};`)
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    //GetKitchenprocess
    async changeMenuSituation(id_menu, statuss){
        try {
            const petition = mcdowellConnection.query(`UPDATE orders SET statuss=${statuss} WHERE uuid_menu = ${id_menu};`)
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

}

module.exports = ordersManager