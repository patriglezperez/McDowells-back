const {Menu} = require("../models/menu");
const mcdowellConnection  = require("../database/connection");

class menuManager{
    static async getAll(){
        const myConnection = mcdowellConnection()
        await myConnection.connect()
        try {
            const bringMenu = await myConnection.query( 'SELECT * FROM menus;');
            console.log(bringMenu)
            return bringMenu;
        } catch (error) {
            console.log('this is the error:', error)
            return false;
        } finally{
            myConnection.end()
        }
    } 
}

module.exports = menuManager