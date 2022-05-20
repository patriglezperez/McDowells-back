const {Menu} = require("../models/menu");
const mcdowellConnection = require("../database/connection");

class menuManager{
    async getAll(){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const bringMenu = await myConnection.query("SELECT * FROM menus;");
            return bringMenu;
        } catch (error) {
            return false;
        } finally{
            myConnection.end()
        }
    } 

    async pickTime(menu_num){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const timeMenu = await myConnection.query(`SELECT time_process FROM menus WHERE menu_num = '${menu_num}';`);
            return timeMenu;
        } catch (error) {
            return false;
        } finally{
            myConnection.end()
        }
    } 
}

module.exports = menuManager