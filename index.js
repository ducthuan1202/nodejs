// dùng để đọc dữ liệu từ file .env
require("dotenv").config();

// khai báo thông tin port, hostname
const port = 1202;
const hostname = '127.0.0.1';

// chèn file kết nối tới database dưới dạng global (sử dụng cho tất cả các package)
global.connectPool = require('./model/mysql/ConnectPool');

// chèn package express
const express = require('express');
const app = express();

// my modules
const Response = require('./model/render/Response');
const Product = require('./model/product/Product');
const Category = require('./model/category/Category');
const XHR = require('./model/request/Xhr');

/******************************
 * Middleware 
 *****************************/
app.use((req, res, next) => {
    // thêm tham số cho request
    req.csrf = 'nauht-cud-neyugn';
    // set header
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

/******************************
 * Route
 *****************************/
app.get('/', (req, res) => {
    const queries = req.query;
    const reponse = new Response();
    const result = reponse.success(queries);
    res.send(result);
});

// products
app.get('/products', Product.list);
app.get('/products/:id', Product.detail);

// categories
app.get('/categories', Category.getAll);
app.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const category = await Category.getOne(id);
    const reponse = new Response();
    const result = reponse.success(category);
    res.send(result);
});

// api
app.get('/api', XHR.get);

// 404 
app.get('*', (req, res) => {

    const csrf = req.csrf;
    console.log(csrf);

    const reponse = new Response();
    const result = reponse.error();
    res.send(result);
});

/******************************
 * server listen 
 *****************************/
app.listen(port, hostname, () => console.log(`Listener on http:${hostname}:${port}`));