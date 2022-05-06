const { Orders } = require ("../models/orders");
const { mcdowellConnection } = require("../database/connection");

class ordersManager{
    
    async getDeliveryDate(date, statuss, waiter){
        try {
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND waiter = ${waiter}[0]`);
            return delivery;
        } catch (error) {
            return false
        }
    } 

    async getOrder(date, statuss, row){
        try {
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND LIMIT ${row} ` );
            return delivery;
        } catch (error) {
            return false
        }
    }

    async patchOrderHistory(date, orderDay, waiter){
        try {
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND order_day = ${orderDay} AND waiter = ${waiter}[0]`);
            return delivery;
        } catch (error) {
            return false
        }
    }

    async getStatusWaiter(date, waiter){
        try {
            const waiters = mcdowellConnection.query(`SELECT * FROM orders WHERE date_order = ${date} AND waiter = ${waiter}[0]`); 
            return waiters
        } catch (error) {
            return false
        }
    }

    async patchKitchenProcess(uuid_menu, status){
        try {
            const kitchenProcess = mcdowellConnection.query(`UPDATE orders SET statuss = ${status} WHERE uuid_menu = ${uuid_menu}`);
            return kitchenProcess
        } catch (error) {
            return false
        }
    }

    async postNewOrder(){

    }

    async putCancelled(){

    }

    async putDelivered(){

    }

    async putPaused(){
        
    }
}

module.exports = ordersManager