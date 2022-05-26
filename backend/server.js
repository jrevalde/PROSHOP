/*const dotenv = require('dotenv'); //important for keeping data private.
const express  = require('express');
const products = require('./data/products.js');*/

//this is using the es modules features that react has.
import dotenv from 'dotenv';
import express from 'express';
//import products from './data/products.js';  we don't need this anymore since we are connecting to MongoDB atlas.
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.get('/api/products', (req, res) => {
   res.json(products);
});

app.get('/api/products/:id', (req, res) => { //get a single product instead of whole thing
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
 });

const PORT = process.env.PORT || 5000; //accessing the variable declared in .env
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, console.log(`Server Running in ${NODE_ENV} mode on Port: ${PORT}`));