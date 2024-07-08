// Import des modules nécessaires
const { Sequelize } = require("sequelize")
require('dotenv').config()

// Connexion à la DB
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false
    }
)

const db = {}

// // Import des modèles
db.sequelize = sequelize


// Synchronisation des modèles
// db.sequelize.sync()

module.exports = db