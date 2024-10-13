import dotenv from "dotenv";
import mysql, { PoolOptions } from "mysql2";

dotenv.config();

const access: PoolOptions = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    port: Number(process.env.DB_PORT)
};

const pool = mysql.createPool(access);

pool.getConnection((err, connection) => {
    if (err) {
        console.log('error connecting: '+err);
    } else {
        console.log("connected to the Beaumiel DB.");
    }
});

export default pool;