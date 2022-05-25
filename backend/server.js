const express  = require('express');
const products = require('./data/products.js');

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

app.listen(5000, console.log('Server Running on Port: 5000'))