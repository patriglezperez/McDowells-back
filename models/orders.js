import { sequelize } from "../database/database.js";
import { DataTypes, HasMany } from "sequelize";


export const Orders = sequelize.define('orders', {
    serial_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_day: {
        type: DataTypes.DATE,
        allowNull: false
    },
    uuid_user: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    uuid_menu: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    menu_num: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    chef: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    waiter: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    order_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_order: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

/* Orders.hasMany(Staff, {
    foreignKey: "",
    sourceKey: ""
})

Staff.belongsToMany(Orders, {
    foreignKey: "",
    targetKey: ""
}); 




Orders.hasMany(Menu, {
    foreignKey:"menu_num",
    sourceKey:"menu_num"
})

Menu.belongsToMany(Orders, {
    foreignKey: "menu_num",
    targetKey: "menu_num"
}); */