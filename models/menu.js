import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Orders } from "./orders.js"


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

Menu.hasMany(Orders, {
    foreignKey:"menu_num",
    sourceKey:"menu_num"
})

Orders.belongsTo(Menu, {
    foreignKey: "menu_num",
    targetKey: "menu_num"
});