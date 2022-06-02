import express from "express";

const router = express.Router();

import {getProducts, getProductById} from '../controllers/productController.js';

//this route is going to fetch all products
router.get('/', getProducts);
 
 //this route fetches 1 product by its id.
 router.get('/:id', getProductById);

export default router;