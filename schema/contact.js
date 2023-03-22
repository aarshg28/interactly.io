const { DataTypes } = require("sequelize");
const { sequelize } = require('../db/db')
const Contact = sequelize.define("contacts", {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false
    },

});
module.exports = Contact