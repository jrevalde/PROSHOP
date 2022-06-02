/*const dotenv = require('dotenv'); //important for keeping data private.
const express  = require('express');
const products = require('./data/products.js');*/

//this is using the es modules features that react has.
import dotenv from 'dotenv';
import express from 'express';
//import products from './data/products.js';  we don't need this anymore since we are connecting to MongoDB atlas.
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleWare.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler); //this is error middleware.

const PORT = process.env.PORT || 5000; //accessing the variable declared in .env
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, console.log(`Server Running in ${NODE_ENV} mode on Port: ${PORT}`));