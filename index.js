const express = require('express');
const app = express();
const port = 4000;
const hostname = '127.0.0.1';

const Product = require('./routes/product/Product');
const Categories = require('./routes/mysql/connect');

app.listen(port, () => {
    console.log(`Listener on http:${hostname}:${port}`);
});

app.get('/products', Product.list);
app.get('/products/:id', Product.detail);

app.get('/categories', Categories.getAll);
app.get('/categories/:id', async(req, res) => {
    const id = req.params.id;
    const category = await Categories.getOne(id);
    console.log(category);
    res.send(category);    
});
