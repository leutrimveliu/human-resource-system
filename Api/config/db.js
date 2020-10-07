const Sequelize = require('sequelize');

const db = new Sequelize(
    'hrsystem',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000
        },
        define: {
            freezeTableName: true 
        },
        logging: false
    }
);

db.authenticate()
    .then(data => console.log('Connected Successfully'))
    .catch(err => console.log(err))

module.exports = db;
















