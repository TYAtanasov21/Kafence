
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

router.post('/rateMachine', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        const client = await pool.connect();
        const { machineId, rating, userId } = body;

        // Check if the user has already rated the machine
        const checkQuery = "SELECT * FROM ratings WHERE machineId = $1 AND userId = $2";
        const checkResponse = await client.query(checkQuery, [machineId, userId]);

        if (checkResponse.rows.length > 0) {
            // User has already rated, so we update their rating
            const updateQuery = "UPDATE ratings SET rating = $1 WHERE machineId = $2 AND userId = $3";
            await client.query(updateQuery, [rating, machineId, userId]);
            console.log("Rating updated");
            res.status(200).json({ message: "Rating updated successfully" });
        } else {
            // User has not rated the machine, so we insert a new rating
            const insertQuery = "INSERT INTO ratings (machineId, rating, userId) VALUES ($1, $2, $3)";
            await client.query(insertQuery, [machineId, rating, userId]);
            console.log("Rating added");
            res.status(200).json({ message: "Rating added successfully" });
        }

        client.release();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
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
