import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Orders } from "./orders.js"

export const Staff = sequelize.define('staff', {
    uuid_staff:{
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    status:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
})

Staff.hasMany(Orders, {
    foreignKey: "chef",
    foreignKey: "waiter",
    sourceKey: "uuid_staff"
})

Orders.belongsTo(Staff, {
    foreignKey: "chef",
    foreignKey: "waiter",
    targetKey: "uuid_staff"
});