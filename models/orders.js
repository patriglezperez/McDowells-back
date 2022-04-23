import { sequelize } from "../database/database.js";
import { DataTypes, HasMany } from "sequelize";
import {Staff} from './staff.js';
import {Menu} from './menu.js'

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


Staff.hasMany(Orders, {
    foreignKey: "chef",
    sourceKey: "uuid_staff"
})

Staff.hasMany(Orders, {
    foreignKey: "waiter", 
    sourceKey: "uuid_staff"
})

Orders.belongsToMany(Staff, {
    through: OrdersStaff,
    foreignKey: "chef",
    targetId: "uuid_staff"
});

Orders.belongsToMany(Staff, {
    through: OrdersStaff,
    foreignKey: "waiter",
    targetId: "uuid_staff"
});


Menu.hasOne(Orders, {
    foreignKey:"menu_num",
    sourceKey:"menu_num"
})

Orders.belongsTo(Menu, {
    foreignKey: "menu_num",
    targetid: "menu_num"
});