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
    async getOrderHistory(date){
        try {
            const history = mcdowellConnection.query(`SELECT * FROM orders WHERE order_day = ${date} LIMIT 100;`
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

    //
    async getDeliveryDateWaiter(date, statuss, waiter){
        try {
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND waiter = ${waiter};`);
            return delivery;
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    } 

    //s
    async getOrderWaiter(date, statuss, row){
        try {
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND statuss = ${statuss} AND LIMIT ${row} ;` );
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
            const delivery = mcdowellConnection.query( `SELECT * FROM orders WHERE date_order = ${date} AND order_day = ${orderDay} AND waiter = ${waiter}[0];`);
            return delivery;
        } catch (error) {
            return false
        } finally{
            mcdowellConnection.end()
        }
    }

    //
    async getStatusWaiter(date, waiter){
        try {
            const waiters = mcdowellConnection.query(`SELECT * FROM orders WHERE date_order = ${date} AND waiter = ${waiter}[0];`); 
            return waiters
        } catch (error) {
            return false
        } finally{
            mcdowellConnection.end()
        }
    }

    //
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

    //
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

    async sendReceipt(data) {
        //Connection to ethereal SMTP server
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.TRANSPORTER_EMAIL,
                pass: process.env.TRANSPORTER_PASSWORD
            }

        });

        const message = {
            from: "McDowell's <servicio@mcdowells.com>",
            to: `${data.email}`,
            subject: "Aquí tienes el ticket de tu compra en McDowell's",
            html: "<p>HTML version of the message</p>"
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            } 
            console.log(info);
            return info;
        })
    }

    async putCancelled(){

    }

    async putDelivered(){

    }

    async putPaused(){
        
    }
}

module.exports = ordersManager