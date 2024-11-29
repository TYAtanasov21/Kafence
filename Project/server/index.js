import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pkg from "pg";
import userRoutes from './routes/userRoutes.js';
import machineRoutes from './routes/machineRoutes.js';
const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5001;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/machine', machineRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });