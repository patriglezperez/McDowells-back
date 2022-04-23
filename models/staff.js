import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";


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
