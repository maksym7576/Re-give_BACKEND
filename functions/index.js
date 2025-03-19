const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require("cors");
const userRoutes = require('./src/routes/userRoutes');
const productController = require('./src/controllers/ProductController');

app.use(cors({ origin: true })); 
app.use(express.json());
app.use('/', userRoutes);
app.use('/', productController);

exports.api = functions.https.onRequest(app);