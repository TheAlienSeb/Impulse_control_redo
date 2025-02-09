const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
const cors = require('cors');
const db = require('../server/firebase');
dotenv.config(); // Load environment variables

const NessieAPIKey = process.env.NessieAPI; // CapitalOne API key
const NessieAPIURL = 'http://api.nessieisreal.com/customers';
router.use(cors());
router.use(express.json());

router.post('/create', async (req, res) => { // Create a customer with Nessie API
  const { first_name, last_name, address} = req.body;

  // Check if the required fields exist
  if (!first_name || !last_name || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Prepare the data to be sent to the external API
    const apiBody = {
      first_name,  // Send first_name
      last_name,   // Send last_name
      address: {   // Send the address in the correct format
        street_number: address.street_number,
        street_name: address.street_name,
        city: address.city,
        state: address.state,
        zip: address.zip
      }
    };

    console.log('Request Body:', apiBody);
    console.log('NessieAPI Key:', NessieAPIKey);

    const response = await axios.post(
      NessieAPIURL, 
      apiBody, 
      { 
        params: { key: NessieAPIKey },
        headers: { "content-type": "application/json; charset=utf-8"} // Ensure correct content type
      }
    );

    console.log('API Response:', response.data);
    const docRef = await db.collection('users').add({ first_name, last_name, address, id: response.data.objectCreated._id });
    res.status(200).json({
      message: 'Customer created successfully',
      externalApiData: response.data,
      docRef: docRef.id
    });
  } catch (error) {
    // Handle any errors
    console.error('Error from Nessie API:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/get', async (req, res) => { // Get all customers from Nessie API
  try {
    const response = await axios.get(
      NessieAPIURL, 
      { 
        params: { key: NessieAPIKey },
        headers: { "content-type": "application/json; charset=utf-8"} // Ensure correct content type
      }
    );

    console.log('API Response:', response.data);

    // Respond to the client with the data from the external API
    res.status(200).json({
      message: 'Customers fetched successfully',
      externalApiData: response.data  // Include the external API response data
    });
  } catch (error) {
    // Handle any errors
    console.error('Error from Nessie API:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;