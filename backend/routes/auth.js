// Import express
const express = require('express')
// Import du contrôleur d'authentification
const authCtrl = require('../controllers/auth')

// Récupération routage express
let router = express.Router()

// Routage Auth
router.put("/signup", authCtrl.signup)
router.post("/login", authCtrl.login)

module.exports = router