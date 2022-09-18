import { Sequelize } from "sequelize";
import dotenv from 'dotenv/config';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_TYPE
}
)

export default sequelize;

export function openConnection()
{
    return sequelize.authenticate();
}

export function closeConnection()
{
    return sequelize.close();
}