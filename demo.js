const
    express = require('express'),
    app = express(),
    Order = require('./db/Order');

app.listen(3000, () => console.log(`Server start at http://127.0.0.1:3000`));

const Actions = {
    ordersList: async (req, res) => {
        var limit = parseInt(req.query.limit) || 30;
        limit = Math.abs(limit);

        const orders = await Order.findAll(limit);
        if (orders) res.json(orders);
        else res.send('404');
    },
    orderDetail: async (req, res) => {
        const orderID = req.params.orderID;
        const order = await Order.findOne(orderID);
        if (order) res.json(order);
        else res.send('404');
    }
}

app.get('/orders', Actions.ordersList);
app.get('/orders/:orderID', Actions.orderDetail);