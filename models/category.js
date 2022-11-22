module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define('category', {
        Category_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        Name: { type: Sequelize.STRING, allowNull: false },
        Details: { type: Sequelize.STRING, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    })

    return category
}