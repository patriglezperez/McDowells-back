const mcdowellConnection = require("../database/connection");
const nodemailer = require("nodemailer")

class orderManager{
    
    //getDeliveredDate
    async getDeliveredDate(date){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const today = await myConnection.query(`SELECT order_day FROM orders WHERE date_order = '${date}' GROUP BY order_day;`)
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
            const history = await myConnection.query(`SELECT * FROM orders ORDER BY date_order DESC  LIMIT ${rows};`
            );
            return history
        } catch (error) {
            return false
        }finally{
            await myConnection.end();
        }
    }

    //getStatus
    async getStatus(active){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const activeStatus = await myConnection.query(`SELECT * FROM orders WHERE statuss = '${active}' ;`);
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
            const getDay = await myConnection.query(`SELECT * FROM orders WHERE date_order = '${orderDay}' ;`)
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
            const newOrder = await myConnection.query(`INSERT INTO orders (order_day, uuid_menu, uuid_user, menu_num, statuss, date_order) VALUES ('${data.order_day}','${data.uuid_menu}','${data.uuid_user[0]}','${data.menu_num}','${data.status}','${data.date_order}');`)
            return newOrder
        } catch (error) {
            return false
        } finally{
            myConnection.end()
        }
    }

    async sendReceipt(data) {
        // console.log('sendReceipt');
        // console.log(process.env.TRANSPORTER_EMAIL, process.env.TRANSPORTER_PASSWORD);
        //Connection to ethereal SMTP server
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.TRANSPORTER_EMAIL,
                pass: process.env.TRANSPORTER_PASSWORD
            }
        });

        const message = {
            from: "McDowell's <servicio@mcdowells.com>",
            to: `${data.email.email}`,
            subject: "Aquí tienes el ticket de tu compra en McDowell's",
            html: `<div><p>Tu número de pedido es ${data.order.orderNumber}</p> <p>El total de tu compra es ${data.order.orderTotal}</p></div>`
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log(error, 'email errro');
                return false;
            } 
        })

        return true;
    }

    async putCancelled(){}

    async putStatus(order, date, statuss){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const updateOrder = await myConnection.query(`UPDATE orders SET statuss='${statuss}' WHERE order_day = '${order}' AND date_order = '${date}'`)
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
            const menuStatus = await myConnection.query(`SELECT * FROM orders WHERE statuss = '${statuss}' AND date_order ='${date}';`);
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
            const orderCook = await myConnection.query(`UPDATE orders SET chef = '${cook[0]}', statuss = '${kitchen}', order_notes = '${cook}' WHERE uuid_menu = '${id}';`);
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
            return petition;
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
    async patchCancelled (order, dateNow, cancelled){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const patchStat = myConnection.query(`SELECT * FROM orders WHERE order_day = '${order}' AND statuss = '${cancelled} AND date_order = ${dateNow}';`);
            return patchStat
        } catch (error) {
            return false;
        } finally{
            myConnection.end()
        }
    }

    //patchFinish
    async patchFinish (order, dateNow, finished){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const patchStat = myConnection.query(`SELECT * FROM orders WHERE order_day = '${order}' AND statuss = '${finished} AND date_order = ${dateNow}';`);
            return patchStat
        } catch (error) {
            return false;
        } finally{
            myConnection.end()
        }
    }

    //patchFinish
    async patchPaused(order, dateNow, paused){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const patchStat = myConnection.query(`SELECT * FROM orders WHERE order_day = '${order}' AND statuss = '${paused} AND date_order = ${dateNow}';`);
            return patchStat
        } catch (error) {
            return false;
        } finally{
            myConnection.end()
        }
    }

}

module.exports = orderManager;