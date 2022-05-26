import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from '../models/productModel.js';


//this route is going to fetch all products
router.get('/',asyncHandler( async (req, res) => {
    const products = await Product.find({}); //passing in an empty object will return all the data.
    res.json(products);
 }));
 
 //this route fetches 1 product by its id.
 router.get('/:id',asyncHandler( async (req, res) => { //get a single product instead of whole thing
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
  }));

export default router;