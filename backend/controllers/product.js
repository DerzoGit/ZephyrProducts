// Import des modules nécessaires
const db = require('../db.config')
const { CustomError } = require('../middleware/customError')

// Récupération de tous les produits
exports.getAllProducts = (req, res, next) => {
    db.Product.findAll()
        .then(products => res.json({ data: products }))
        .catch(err => next(err))
}

// Récupération d'un produit via ID
exports.getProduct = async (req, res, next) => {
    try {
        // Récupération de l'ID
        let productId = parseInt(req.params.id)

        // Vérification si ID existant
        if(!productId) {
            throw new CustomError("L'identifiant produit n'est pas correct.", 400)
        }

        // Récupération du produit
        let product = await db.Product.findOne({ where: {id: productId }})

        // Test si produit existant
        if(product == null) {
            throw new CustomError("Ce produit n'existe pas.", 404)
        }

        // Renvoi du post trouvé
        return res.json({ data: post })
    } catch (err) {
        next(err)
    }
}

// Création d'un produit
exports.createProduct = async (req, res, next) => {
    try {
        // Récupération de l'ID utilisateur
        const userId = req.auth.userId

        // Récupération des champs remplis
        const { nom, description } = req.body

        // Vérification si l'utilisateur authentifié est admin
        if(req.auth.userRole !== "Admin") {
            throw new CustomError("Vous n'avez pas les permissions nécessaires.", 403)
        }

        // Vérification des données reçues
        if(!userId || !nom || !description) {
            throw new CustomError("Des données sont manquantes.", 400)
        }

        // Vérification si produit déjà présent
        let product = await db.Product.findOne({ where: { nom: nom }})
        if(product !== null) {
            throw new CustomError(`Le produit nommé ${product.nom} existe déjà.`, 409)
        }

        // Création du produit
        product = await db.Product.create(req.body)

        return res.json({ message: "Le produit a été créé.", data:product })
    } catch (err) {
        next(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        // Récupération de l'ID utilisateur
        let productId = parseInt(req.params.id)

        // Vérification si ID présente
        if(!productId) {
            throw new CustomError("L'ID du produit n'a pas été récupéré.", 400)
        }

        // Vérification si l'utilisateur authentifié est admin
        if(req.auth.userRole !== "Admin") {
            throw new CustomError("Vous n'avez pas les permissions nécessaires.", 403)
        }

        // Recherche du produit et vérification si existant
        let product = await db.Product.findOne({ where: { id: productId }})
        if(product === null) {
            throw new CustomError("Ce produit n'existe pas.", 404)
        }

        // Mise à jour du produit
        product = await db.Product.update(req.body, { where: { id: productId }})

        return res.status(200).json({ message: "Le produit a bien été mise à jour."})
    } catch (err) {
        next(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        // Récupération de l'ID utilisateur
        let productId = parseInt(req.params.id)

        // Vérification si ID présente
        if(!productId) {
            throw new CustomError("L'ID du produit n'a pas été récupéré", 400)
        }

        // Vérification si l'utilisateur authentifié est admin
        if(req.auth.userRole !== "Admin") {
            throw new CustomError("Vous n'avez pas les permissions nécessaires.", 403)
        }

        // Recherche du produit et vérification si existant
        let product = await db.Product.findOne({ where: { id: productId }})
        if(product === null) {
            throw new CustomError("Ce produit n'existe pas.", 404)
        }

        // Suppression du produit
        await db.Product.destroy({ where: { id: productId }, force: true })

        return res.status(204).json({})
    } catch (err) {
        next(err)
    }
}