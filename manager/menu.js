const {Menu} = require("../models/menu");
const { mcdowellConnection } = require("../database/connection");

class menuManager{
    static async getAll(){
        try {
            console.log(mcdowellConnection)
            const bringMenu = await mcdowellConnection.query( 'SELECT * FROM menus;');
            console.log(bringMenu)
            return bringMenu;
        } catch (error) {
            console.log('this is the error:', error)
            return false;
        } finally{
            mcdowellConnection.end()
        }
    } 
}

module.exports = menuManager