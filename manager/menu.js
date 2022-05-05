const Menu = require("../models/menu");
const { mcdowellConnection } = require("../database/connection");

class menuManagers{
    async getAll(){
        try {
            const bringMenu =await mcdowellConnection.query( `SELECT * FROM menus;`);
            return bringMenu;
        } catch (error) {
            return false;
        }
    } 
}

module.exports = menuManagers