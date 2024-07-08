// Import express
const express = require('express')
// Import du contrôleur d'authentification
const productCtrl = require('../controllers/product')

// Récupération routage express
let router = express.Router()

// Routage Product
router.get("/", productCtrl.getAllProducts)
router.get("/:id", productCtrl.getProduct)
router.post("/", productCtrl.createProduct)
// router.put("/:id", productCtrl.updateProduct)
router.delete("/:id", productCtrl.deleteProduct)

module.exports = router