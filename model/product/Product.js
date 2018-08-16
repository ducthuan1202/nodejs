const Response = require('./../render/Response');
const reponse = new Response();

const PRODUCTS = [
    { id: 1, name: 'Iphone 6s Gold 32Gb', price: 5990000, saleof: '29%' },
    { id: 2, name: 'Iphone 6s Plus Gold 64Gb', price: 6990000, saleof: '28%' },
    { id: 3, name: 'Iphone 7 Gold 128Gb', price: 12990000, saleof: '32%' },
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