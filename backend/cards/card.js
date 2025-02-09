const express = require('express')
const router = express.Router()
const axios = require('axios');
const dotenv = require("dotenv");
const db = require('../server/firebase');
const Lithic = require('lithic');

const LithicSandBoxAPI = process.env.LithicSandBoxAPI;

dotenv.config(); // Load environment variables

const lithic = new Lithic({
    apiKey: LithicSandBoxAPI, // or "Production API key"
    environment: "sandbox", // or "production". Defaults to "production"
  });

// Create a card

router.post('/createCard', async (req, res) => {
    try {
        const cardParams = { type: "VIRTUAL" }; // No TypeScript annotations!
        const card = await lithic.cards.create(cardParams); // Await response
        console.log("Card Created:", card);
        res.status(201).send(card.token);
      } catch (error) {
        console.error("Error creating card:", error);
      }
});

module.exports = router;