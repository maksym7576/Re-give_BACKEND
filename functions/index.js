const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require("cors");
const userRoutes = require('./src/routes/userRoutes');

app.use(cors({ origin: true })); 
app.use(express.json());
app.use('/', userRoutes);

exports.api = functions.https.onRequest(app);
