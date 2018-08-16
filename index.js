const port = 1202;
const hostname = '127.0.0.1';

// global mysql connect pool
global.connectPool = require('./model/mysql/ConnectPool');

// require express
const express = require('express');
const app = express();

// my modules
const Product = require('./model/product/Product');
const Category = require('./model/category/Category');
const Response = require('./model/render/Response');

// server listen
app.listen(port, hostname, () => console.log(`Listener on http:${hostname}:${port}`));

// route home page
app.get('/', (req, res) => {
    const queries = req.query;

    const reponse = new Response();
    const result = reponse.success(queries);
    res.set('Access-Control-Allow-Origin','*');
    res.send(result);
});

// route products
app.get('/products', Product.list);
app.get('/products/:id', Product.detail);

// route categories
app.get('/categories', Category.getAll);
app.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const category = await Category.getOne(id);

    const reponse = new Response();
    const result = reponse.success(category);
    res.set('Access-Control-Allow-Origin','*');
    res.send(result);
});

// route 404 
app.get('*', (req, res) => {
    const reponse = new Response();
    const result = reponse.error();
    res.set('Access-Control-Allow-Origin','*');
    res.send(result);
});