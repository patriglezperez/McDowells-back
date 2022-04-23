import { Sequelize } from "sequelize";

export const sequelize = new Sequelize( 
    'mcdowell', 
    'postgres', 
    '1234', 
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)