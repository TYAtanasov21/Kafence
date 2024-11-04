
import express from 'express';
import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;



import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const pool = new Pool({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: 'postgres',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, 
    },
});

router.get('/getMachines', async (req, res) =>{
    try{
        const client = await pool.connect();
        const response = await client.query("SELECT * FROM machines");
        console.log(response.rows);
    }
    catch(error) {
        console.log(error);
    }
});

export default router;