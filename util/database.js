const Sequelize = require('sequelize').Sequelize;
const mysql = require('mysql2');

const sequelize = new Sequelize('meetings','root','root@12345',{
    dialect : 'mysql',
    host: 'localhost'
});

module.exports = sequelize;