const admin = require('firebase-admin');
const Product = require('../models/Product');

if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

const createProduct = async (product) => {
    const productRef = db.collection('products').doc();
    const newProduct = {
        name: product.name,
        description: product.description,
        uid: product.uid,
        imageUrl: product.imageUrl,
        objectType: product.objectType,
        location: product.location,
    };
    await productRef.set(newProduct);
    product.id = productRef.id;
    return product;
};

const getProductsByUserUid = async (uid) => {
    const productsRef = db.collection('products');
    const snapshot = await productsRef.where('uid', '==', uid).get();

    if (snapshot.empty) {
        throw new Error('No products found for this user');
    }

    const products = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        products.push(new Product(data.name, data.description, data.uid, data.imageUrl, data.objectType, data.location));
    });

    return products;
};

const getAllProducts = async () => {
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
        return [];
    }

    const products = snapshot.docs.map(doc => {
        const data = doc.data();
        return new Product(data.name, data.description, data.uid, data.imageUrl, data.objectType, data.location);
    });

    return products;
};

const getProductById = async (id) => {
    const productRef = db.collection('products').doc(id);
    const doc = await productRef.get();
    if (!doc.exists) {
        throw new Error('Product not found');
    }
    const data = doc.data();
    return new Product(data.name, data.description, data.uid, data.imageUrl, data.objectType, data.location);
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

module.exports = { getProductById, createProduct, updateProduct, deleteProduct, getProductsByUserUid, getAllProducts };
