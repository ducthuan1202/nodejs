const Sequelize = require('sequelize');

const DB = {
    host: 'localhost',
    name: 'test',
    user: 'root',
    pass: '',
    port: 3306,
};

const sequelize = new Sequelize(DB.name, DB.user, DB.pass, {
    host: DB.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    port: DB.port,
    define: {
        underscored: false,
        freezeTableName: false,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: false
    },
    operatorsAliases: false
});

const Order = sequelize.define('order', {
    orderNumber: { // định nghĩa 1 khóa riêng (mặc định là id)
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    orderDate: Sequelize.DATE,
    requiredDate: Sequelize.DATE,
    shippedDate: Sequelize.DATE,
    status: Sequelize.STRING,
    comments: Sequelize.TEXT,
    customerNumber: Sequelize.INTEGER
});

/**  
 * Query string like:
 * ------------------------------------------
 * SELECT `orderNumber` AS `order_number`, `requiredDate` AS `required_date`, `shippedDate` AS `shipped_date`, `customerNumber` AS `customer_number`, `status` 
 * FROM `orders` AS `order` 
 * WHERE `order`.`status` = 'Shipped' 
 * LIMIT 5, 5;
 * ------------------------------------------
 */
Order.findAll({
    where: { status: 'Shipped' },
    offset: 5,
    limit: 5,
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
    console.log(jsonData);
})

/**
 * Query string like:
 * ------------------------------------------
 * SELECT `orderNumber`, `orderDate`, `requiredDate`, `shippedDate`, `status`, `comments`, `customerNumber` 
 * FROM `orders` AS `order` 
 * WHERE `order`.`status` = 'Shipped' AND `order`.`orderNumber` IN (10123, 10124) 
 * LIMIT 1;
 * ------------------------------------------
 */
const Op = Sequelize.Op
Order.findOne({
    where: {
        status: 'Shipped',
        orderNumber: {
            [Op.in]: [10123, 10124],
        }
    }
}).then(order => {    
    console.log(order.get('orderNumber'))
});