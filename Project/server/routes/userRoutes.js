
import express from 'express';
const router = express.Router();


router.get('/getUser', (req, res) => {
    try {
        const user = req.query;
        console.log(user);

        res.status(200).json({ message: "Request successful", user: user });
    } 
    catch (error) {
        console.error('Error in /getUser:', error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
