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

    console.log('Received request create user:', { email, password });

    if (!email || !password) {
        console.log('Missing required fields');
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Check if a user with the given email already exists
        const existingUser = await db.collection('users').where('email', '==', email).get();
        if (!existingUser.empty) {
            console.log('User with this email already exists.');
            return res.status(400).json({ success:false, error: "User with this email already exists" });
        }

        const userInfo = {
            email: email,
            password: password,
            balance: 0,
            fullName: '',
            biggestSpendingExpenses: [],
            createdAt: new Date().toISOString(),
            card: {
                cardNumber: '',
                cardHolder: '',
                expirationDate: '',
                cvv: ''
            },
            transactions: [],
            income: 0,
            phoneNumber: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: ''
            }
            
        };

        const docRef = await db.collection('users').add(userInfo);
        console.log('Document written with ID: ', docRef.id);
        res.status(201).json({success:true, user: { ...userInfo, id: docRef.id } });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received request signin:', { email, password });

    if (!email || !password) {
        console.log('Missing required fields');
        return res.status(400).json({success:false,error: "Missing required fields" });
    }

    try {
        const user = await db.collection('users')
            .where('email', '==', email)
            .where('password', '==', password)
            .get();

        if (user.empty) {
            console.log('No matching documents.');
            return res.status(400).json({success:false,error: "No matching documents" });
        }

        // Send only the first found user
        const userData = user.docs[0].data();
        console.log('User found:', userData);
        res.status(200).json({success:true,user: { ...userData, id: user.docs[0].id } });

    } catch (error) {
        console.error('Error getting user:', error);
        res.status(400).json({success:false,error: error.message });
    }
});

router.put('/updateProfile', async (req, res) => {
    const { email, newData } = req.body;

    if (!email || !newData) {
        return res.status(400).json({success:false,error: "Missing fields" });
    }

    try {
        const userRef = db.collection('users').where('email', '==', email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(400).json({success:false,error: "User not found" });
        }

        snapshot.forEach(async (doc) => {
            await doc.ref.update(newData);
        });

        res.status(200).json({success:true, success_msg: "Profile updated" });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(400).json({ error: error.message });
    }
});

// New endpoint to update full name
router.put('/updateFullName', async (req, res) => {
    const { email, fullName } = req.body;

    if (!email || !fullName) {
        return res.status(400).json({ success: false, error: "Missing fields" });
    }

    try {
        const userRef = db.collection('users').where('email', '==', email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(400).json({ success: false, error: "User not found" });
        }

        snapshot.forEach(async (doc) => {
            await doc.ref.update({ fullName });
        });
        res.status(200).json({ success: true, success_msg: "Full name updated" });
    } catch (error) {
        console.error('Error updating full name:', error);
        res.status(400).json({ success: false, error: error.message });
    }
});

// New endpoint to update biggest spending expenses
router.put('/updateBiggestSpendingExpenses', async (req, res) => {
    const { email, biggestSpendingExpenses } = req.body;

    if (!email || !biggestSpendingExpenses) {
        return res.status(400).json({ success: false, error: "Missing fields" });
    }

    try {
        const userRef = db.collection('users').where('email', '==', email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(400).json({ success: false, error: "User not found" });
        }

        snapshot.forEach(async (doc) => {
            await doc.ref.update({ biggestSpendingExpenses });
        });

        res.status(200).json({ success: true, success_msg: "Biggest spending expenses updated" });
    } catch (error) {
        console.error('Error updating biggest spending expenses:', error);
        res.status(400).json({ success: false, error: error.message });
    }
});

// New endpoint to update card details
router.put('/updateCardDetails', async (req, res) => {
    const { email, cardDetails } = req.body;

    if (!email || !cardDetails) {
        return res.status(400).json({ success: false, error: "Missing fields" });
    }

    try {
        const userRef = db.collection('users').where('email', '==', email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(400).json({ success: false, error: "User not found" });
        }

        snapshot.forEach(async (doc) => {
            await doc.ref.update({ card: cardDetails });
        });

        res.status(200).json({ success: true, success_msg: "Card details updated" });
    } catch (error) {
        console.error('Error updating card details:', error);
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;