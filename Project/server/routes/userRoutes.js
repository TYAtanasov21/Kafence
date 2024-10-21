
import express from 'express';
import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;



import dotenv from 'dotenv';
dotenv.config();


const saltRounds = 10;
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

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;  
        
        if (!username || !email) {
            return res.status(400).json({ code: 0, message: 'Username and email are required' });
        }

        const client = await pool.connect();
        console.log("Connected to the pg database");

        const checkUsername = await client.query("SELECT COUNT(*) FROM users WHERE username = $1", [username]);
        const checkEmail = await client.query("SELECT COUNT(*) FROM users WHERE email = $1", [email]);

        if (parseInt(checkUsername.rows[0].count) > 0) {
            client.release();
            return res.status(200).json({ code: 2, message: 'Username already exists' });
        } else if (parseInt(checkEmail.rows[0].count) > 0) {
            client.release();
            return res.status(200).json({ code: 3, message: 'Email already taken' });
        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

            client.release();
            return res.status(200).json({ code: 1, message: 'Registration successful' });
        }

    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ signedIn: false, message: 'Internal Server Error' });
    }
});


router.post('/checkUser', async (req, res) => {
    try {
        const client = await pool.connect();
        console.log('Connected to the pg database');

        const { username, email } = req.body; 

        if (!username || !email) {
            return res.status(400).json({ message: "Username and email are required" });
        }

      const response = await client.query(
            "SELECT * FROM users WHERE username = $1 AND email = $2",
            [username, email]
        );

        if (response.rows.length > 0) {
           return res.status(200).json({ message: "User exists", user: response.rows[0], check: true });
        } else {
            return res.status(404).json({ message: "User does not exist", check: false });
        }
    } 
    catch (error) {
        console.error('Error in /checkUser:', error);
        res.status(500).json({ error: "Server error" });
    } 
    finally {
        client.release();
    }
});


export default router;
