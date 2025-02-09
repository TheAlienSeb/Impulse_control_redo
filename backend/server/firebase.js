const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

// Load the Firebase service account key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Firestore instance

module.exports = db;