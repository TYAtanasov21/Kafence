
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
    port: 6543,
    ssl: {
        rejectUnauthorized: false, 
    },
});

router.get('/getMachines', async (req, res) =>{
    try{
        const client = await pool.connect();
        const response = await client.query("SELECT * FROM machines");
        const data = response.rows;
        console.log(data);
        res.status(200).json({array:data});
        client.release();
    }
    catch(error) {
        console.log(error);
    }
});

router.post('/rateMachine', async (req, res)=>{
    try{
        const body = req.body;
        console.log(body);
        const client = await pool.connect();
        const query = "INSERT INTO ratings (machineId, rating) VALUES ($1, $2)";
        const response = await client.query(query, [body.machineId, body.rating]);
        const data = response.rows;
        console.log("Rating complete");
        res.status(200).json(data);
        client.release();
    }
    catch(error) {
        console.log(error);
    }

    
});

router.post('/getRating', async (req, res)=>{
    try{
        const body = req.body;
        console.log(body);
        const client = await pool.connect();

        const queryRating = "SELECT AVG(rating) FROM ratings WHERE machineId = $1";
        const responseRating = await client.query(queryRating, [body.machineId]);
        const dataRating = responseRating.rows[0];

        const queryCount = "SELECT COUNT(rating) FROM ratings WHERE machineId = $1";
        const responseCount = await client.query(queryCount, [body.machineId]);
        const dataCount = responseCount.rows[0];

        console.log("Retrieval complete: ", dataRating, " " ,dataCount);
        res.status(200).json({"rating": dataRating, "count": dataCount});
        client.release();
    }
    catch(error) {
        console.log(error);
    }

});


export default router;
