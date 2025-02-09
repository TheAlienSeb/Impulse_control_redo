const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
const cors = require('cors');
const db = require('../server/firebase');
dotenv.config(); // Load environment variables

const NessieAPIKey = process.env.NessieAPI; // CapitalOne API key
router.use(cors());
router.use(express.json());

router.post('/create/:id/account', async (req, res) => { 
    const {id} = req.params;
    const {type, nickname, rewards, balance, account_number} = req.body
    
    const snapshot = await db.collection('users').where('id', '==', id).get();
    if (snapshot.empty) {
      console.log('No matching id found');
      return res.status(404).json({ error: "No matching id found" });
    }

    if(!type || !account_number){
        return res.status(400).json({ error: "Missing required fields" });
    }

    try{
        const apiBody =  {
            type: type,
            nickname: nickname,
            rewards: rewards,
            balance: balance,
            account_number: account_number
        }
        const NessieAPIURL = `http://api.nessieisreal.com/customers/${id}/accounts`;

        const response = await axios.post(
            NessieAPIURL,
            apiBody,
            {params: { key: NessieAPIKey },
            headers: { "content-type": "application/json; charset=utf-8"} // Ensure correct content type
            }
        )




    const docRef = await db.collection('accounts').add({ type, nickname, rewards, balance, account_number, account_id: response.data.objectCreated._id, customer_id: id });
    res.status(200).json({
      message: 'Customer created successfully',
      externalApiData: response.data,
      docRef: docRef.id
    });

    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false, error:error.message})
    }

})

module.exports = router;