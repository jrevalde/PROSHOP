//import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler (async(req, res) =>
{
    const products = await Product.find({}); //passing in an empty object will return all the data.
    res.json(products);
});

const getProductById = asyncHandler (async(req, res) =>
{
    const product = await Product.findById(req.params.id) //req.params.id gives us the id  that is in the url
    if(product)
    {
       res.json(product);
    }
    else
    {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProductById,
    getProducts
}