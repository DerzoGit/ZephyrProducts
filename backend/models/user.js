const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

// Modèle Product
module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER(10), primaryKey: true, autoIncrement: true },
        nom: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(64), is: /^[0-9a-f]{64}$/i },
        role: { type: DataTypes.STRING(100), allowNull: false, defaultValue: "Employee" }
    }, {
        paranoid: true // Soft delete
    })

    // Hash du mot de passe à la création de l'utilisateur
    User.beforeCreate(async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash 
    })

    // Hash du mot de passe à la modification du mot de passe
    User.beforeBulkUpdate(async (user, options) => {
        if(user.attributes.hasOwnProperty("password")) {
            let hash = await bcrypt.hash(user.attributes.password, parseInt(process.env.BCRYPT_SALT_ROUND))
            user.attributes.password = hash
        }
    })

    // Vérification du mot de passe
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel)
    }

    return User
}