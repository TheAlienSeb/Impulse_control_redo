const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
const cors = require('cors');
const db = require('../server/firebase');
dotenv.config(); // Load environment variables

router.use(cors());
router.use(express.json());

router.post('/createUser', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const docRef = await db.collection('users').add({ email, password });
        res.status(201).send(user, docRef.id);
    } catch (error) {
        res.status(400).send(error);
    }
});
