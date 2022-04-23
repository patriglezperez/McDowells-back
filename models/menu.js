import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";


export const Menu = sequelize.define('menu', {
    menu_num:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    menu_name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

