const { DataTypes } = require('sequelize')

// Modèle Product
module.exports = (sequelize) => {
    const Product = sequelize.define("Product", {
        id: { type: DataTypes.INTEGER(10), primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER(10), allowNull: false },
        nom: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false }
    }, {
        paranoid: true // Soft delete
    })

    return Product
}