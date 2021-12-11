//Firebase Cloud 
const admin = require("firebase-admin");

const serviceAccount = require("./proyecto-7-ed492-firebase-adminsdk-5wqoo-d61beb0145.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = { serviceAccount }