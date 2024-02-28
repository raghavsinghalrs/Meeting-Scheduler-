const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Meet = sequelize.define('meet',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    },
    count: {
        type: Sequelize.INTEGER
    }

});
module.exports = Meet;

