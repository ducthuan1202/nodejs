const sequelize = require('./config/Config');
const Struct = require('./struct/Struct');

const Order = sequelize.define('order', Struct.Order);

const int = (val) => {
    val = parseInt(val);
    return isNaN(val) ? 0 : val;
}

exports.findAll = (limit = 10) => {
    limit = int(limit);

    return Order.findAll({
        where: { status: 'Shipped' },
        offset: 0,
        limit: limit,
        attributes: [
            ['orderNumber', 'order_number'],
            ['requiredDate', 'required_date'],
            ['shippedDate', 'shipped_date'],
            ['customerNumber', 'customer_number'],
            'status'
        ]
    }).then(orders => {
        const jsonStringData = JSON.stringify(orders);
        const jsonData = JSON.parse(jsonStringData);
        return jsonData;
    })
}


exports.findOne = (id) => {
    return Order.findOne({
        where: { orderNumber: id }
    }).then(order => {
        const jsonStringData = JSON.stringify(order);
        const jsonData = JSON.parse(jsonStringData);
        return jsonData;
    });
}

