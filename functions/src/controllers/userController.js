const admin = require('firebase-admin');
const { setUserRole } = require('../services/authService');
const jwt = require('jsonwebtoken'); // Ensure you have jwt installed and required

const JWT_SECRET = '324324324234324234'; // Replace with your actual secret key

async function registerUser(req, res) {
    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().createUser({ email, password });
        await setUserRole(userRecord.uid, 'user');
        const payload = {
            uid: userRecord.uid,
            email: userRecord.email,
            role: 'user'
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ token, uid: userRecord.uid, message: 'User registered successfully' });
    } catch (error) {
        console.error("Error ", error);
        res.status(500).json({ error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().getUserByEmail(email);
        const role = (userRecord.customClaims && userRecord.customClaims.role) || 'user';
        const payload = {
            uid: userRecord.uid,
            email: userRecord.email,
            role: role
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ token, uid: userRecord.uid, message: 'User logged in successfully.' });
    } catch (error) {
        console.error("Error ", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { registerUser, loginUser };