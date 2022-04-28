import { sequelize } from "../database/database.js";
import { DataTypes, Deferrable, HasMany, Sequelize } from "sequelize";
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
        references:{
            model: Menu,
            key: 'id',
            Deferrable: sequelize.Deferrable.INITIALLY_INMEDIATE
        },
        allowNull: false
    },
    status: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    chef: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        references:{
            model: Staff,
            key: 'id',
            Deferrable: sequelize.Deferrable.INITIALLY_INMEDIATE
        },
        allowNull: false
    },
    waiter: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        references:{
            model: Staff,
            key: 'id',
            Deferrable: sequelize.Deferrable.INITIALLY_INMEDIATE
        },
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
})

Staff.hasMany(Orders, {
    foreignKey: "waiter"
})

Orders.belongsTo(Staff, {foreignKey: "chef", targetId: 'id'})

Orders.belongsTo(Staff, {foreignKey: "waiter", targetId: 'id'})