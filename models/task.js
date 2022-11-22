module.exports = (sequelize, Sequelize) => {
    const task = sequelize.define('task', {
        task_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        user_id: { type: Sequelize.INTEGER },
        Category_id: { type: Sequelize.INTEGER },
        Title: { type: Sequelize.STRING, allowNull: false },
        details: { type: Sequelize.STRING, allowNull: false },
        status: { type: Sequelize.STRING, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    })
    return task
}