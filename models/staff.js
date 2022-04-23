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

//one-to-one order-menu
//many to many staff-order

