//import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from './config/db.js';

//getting the data we wonna seed
import users from "./data/users.js";
import products from "./data/products.js";

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

dotenv.config();

connectDB();

const importData = async () => //when we are dealing with mongoose, everything returns a promise.
{
    try
    {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        console.log("data has been imported");
        process.exit(); //we just want to exit from the process. which I think means it severs the connection to the DB.
    }
    catch (error) 
    {
        console.error(`Error chicken: ${error}`);
        process.exit(1);
    }
}

const destroyData = async () =>
{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
    
        console.log("data has been destroyed");
        process.exit();
    } catch (error) {
        console.error(`Error feesh: ${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === "-d" || process.argv[2] === "-D")
{
    destroyData();
}
else
{
    importData();
}