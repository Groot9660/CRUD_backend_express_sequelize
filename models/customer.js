const customerinfo = require("./customerinfo")

module.exports = (sequelize, Sequelize) => {
    const customer = sequelize.define('customer', {
        user_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        email: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
        fname: { type: Sequelize.STRING, allowNull: false },
        lname: { type: Sequelize.STRING, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    })

    customer.associate = models => {
        customer.hasOne(models.customerinfo, { foreignKey: "user_id" })
        // customerinfo.belongsTo(models.customer, { foreignKey: "user_id" })
    }

    return customer
}

