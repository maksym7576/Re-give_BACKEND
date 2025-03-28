const jwt = require('jsonwebtoken');
const JWT_SECRET = '324324324234324234';
const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userRecord = await admin.auth().getUser(decodedToken.uid);
        if (!userRecord) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
