const Response = require('./../render/Response');
const reponse = new Response();

const PRODUCTS = [
    { id: 1, name: 'Iphone 6s Gold 32Gb' },
    { id: 2, name: 'Iphone 6s Plus Gold 64Gb' },
    { id: 3, name: 'Iphone 7 Gold 128Gb' },
];

exports.list = (req, res) => {
    const data = (!PRODUCTS) ? reponse.empty() : reponse.success(PRODUCTS);
    res.send(data);
}

exports.detail = (req, res) => {
    const id = req.params.id;
    const product = PRODUCTS.find((item) => item.id == id);
    const data = (!product) ? reponse.empty() : reponse.success(product);
    res.send(data);
}