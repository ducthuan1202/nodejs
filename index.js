const port = 4000;
const hostname = '127.0.0.1';

global.connectPool = require('./model/mysql/ConnectPool');
const express = require('express');
const app = express();
const Product = require('./model/product/Product');
const Category = require('./model/category/Category');

app.listen(port, () => {
    console.log(`Listener on http:${hostname}:${port}`);
});

app.get('/products', Product.list);
app.get('/products/:id', Product.detail);

app.get('/categories', Category.getAll);
app.get('/categories/:id', async(req, res) => {
    const id = req.params.id;
    const category = await Category.getOne(id);
    res.send(category);    
});
