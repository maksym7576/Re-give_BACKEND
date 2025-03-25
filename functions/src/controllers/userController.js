const admin = require('firebase-admin');
const { setUserRole } = require('../services/authService');
const jwt = require('jsonwebtoken'); // Ensure you have jwt installed and required

const JWT_SECRET = '324324324234324234'; // Replace with your actual secret key

async function listOfUsersWithRole(req, res) {
    try {
        const listUsersResult = await admin.auth().listUsers();
        const users = listUsersResult.users.map(user => {
            return {
                uid: user.uid,
                email: user.email,
                role: user.customClaims && user.customClaims.role ? user.customClaims.role : 'user'
            };
        });
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error listing users: ", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { listOfUsersWithRole  };