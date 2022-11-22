module.exports = (sequelize, Sequelize) => {
    const session = sequelize.define('session', {
        session_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        user_id: { type: Sequelize.STRING, allowNull: false },
        jwt: { type: Sequelize.STRING, allowNull: false },
        status: { type: Sequelize.STRING, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    })

    return session
}