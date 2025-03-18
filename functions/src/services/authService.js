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

module.exports = { setUserRole };