const Sequelize = require('sequelize');

exports.Order = {
    orderNumber: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    orderDate: Sequelize.DATE,
    requiredDate: Sequelize.DATE,
    shippedDate: Sequelize.DATE,
    status: Sequelize.STRING,
    comments: Sequelize.TEXT,
    customerNumber: Sequelize.INTEGER
}