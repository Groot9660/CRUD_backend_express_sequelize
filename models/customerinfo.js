module.exports = (sequelize, Sequelize) => {
    const customerinfo = sequelize.define('customerinfo', {
        customer_info_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        user_id: { type: Sequelize.STRING, allowNull: false },
        address: { type: Sequelize.STRING, allowNull: false },
        city: { type: Sequelize.STRING, allowNull: false },
        mobile_number: { type: Sequelize.STRING, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    })

    return customerinfo
}