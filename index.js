const port = 1202;
const hostname = '127.0.0.1';

global.connectPool = require('./model/mysql/ConnectPool');
const express = require('express');
const app = express();
const Product = require('./model/product/Product');
const Category = require('./model/category/Category');
const Response = require('./model/render/Response');

app.listen(port, hostname, () => console.log(`Listener on http:${hostname}:${port}`));

app.get('/', (req, res) => {
    const queries = req.query;

    const reponse = new Response();
    const result = reponse.success(queries);    
    res.status(200).send(result);
});

app.get('/products', Product.list);
app.get('/products/:id', Product.detail);

app.get('/categories', Category.getAll);
app.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const category = await Category.getOne(id);

    const reponse = new Response();
    const result = reponse.success(category);
    res.status(200).send(result);
});

app.get('*', (req, res) => {
    const reponse = new Response();
    const result = reponse.error();
    res.status(404).send(result);
});
