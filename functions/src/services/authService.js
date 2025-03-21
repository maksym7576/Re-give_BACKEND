const admin = require('firebase-admin');

if(!admin.apps.length) {
    admin.initializeApp();
}

async function setUserRole(uid, role) {
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        return { success: true };
    } catch (error) {
        console.error('Error setting custom user claims: ', error);
        throw error;
    }
}

async function getUserByUid(uid) {
    try {
        const userRecord = await admin.auth().getUser(uid);
        return {
            success: true,
            user: userRecord
        };
    } catch (error) {
        return {
            success: false,
            error: 'User not found'
        };
    }
}

module.exports = { setUserRole, getUserByUid };