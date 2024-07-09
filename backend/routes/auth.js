// Import express
const express = require('express')
// Import du contrôleur d'authentification
const authCtrl = require('../controllers/auth')
// Import du rateLimiter
const { loginLimiter } = require('../middleware/rateLimiter')

// Récupération routage express
let router = express.Router()

// Routage Auth
router.put("/signup", authCtrl.signup)
router.post("/login", loginLimiter, authCtrl.login)

module.exports = router