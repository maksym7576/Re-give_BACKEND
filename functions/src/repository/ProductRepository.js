const admin = require('firebase-admin');
const Product = require('../models/product');

if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

const getProductById = async (id) => {
    const productRef = db.collection('products').doc(id);
    const doc = await productRef.get();
    if (!doc.exists) {
        throw new Error('Product not found');
    }
    const data = doc.data();
    return new Product(
        doc.id,
        data.name,
        data.description,
        data.uid,
        data.imageUrl,
        data.objectType,
        data.location
    );
};

const createProduct = async (product) => {
    const productRef = db.collection('products').doc(product.id);
    await productRef.set({
        name: product.name,
        description: product.description,
        uid: product.uid,
        imageUrl: product.imageUrl,
        objectType: product.objectType,
        location: product.location,
    });
};

const updateProduct = async (id, product) => {
    const productRef = db.collection('products').doc(id);
    await productRef.update({
        name: product.name,
        description: product.description,
        uid: product.uid,
        imageUrl: product.imageUrl,
        objectType: product.objectType,
        location: product.location,
    });
};

const deleteProduct = async (id) => {
    const productRef = db.collection('products').doc(id);
    await productRef.delete();
};

module.exports = { getProductById, createProduct, updateProduct, deleteProduct };
