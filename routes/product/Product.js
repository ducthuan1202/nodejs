const data = [
    { id: 1, name: 'Iphone 6s Gold 32Gb' },
    { id: 2, name: 'Iphone 6s Plus Gold 64Gb' },
    { id: 3, name: 'Iphone 7 Gold 128Gb' },
];

exports.list = function (req, res) {
    if (!data) {
        res.send({
            status: 'error',
            data: []
        });
    }
    res.send({
        status: 'done',
        data: data
    });
}

exports.detail = function (req, res) {
    const id = req.params.id;
    const product = data.find((item) => item.id == id);
    if (!product) {
        res.send({
            status: 'error',
            data: []
        });
    }
    res.send({
        status: 'done',
        data: product
    });
}