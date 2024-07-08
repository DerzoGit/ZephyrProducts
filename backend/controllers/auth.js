const jwt = require('jsonwebtoken')
const db = require('../db.config')
const { CustomError } = require('../middleware/customError')
const passValidator = require('password-validator')

// Création d'un schema du mot de passe minimal attendu
const schema = new passValidator()
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces()

// Création d'un utilisateur
exports.signup = async (req, res, next) => {
    try {
        // Récupération des données saisies
        const { nom, password } = req.body

        // Validation des données
        if(!nom || !password) {
            throw new CustomError("Un champ à remplir est manquant", 400)
        }

        // Vérification de l'existance de l'utilisateur
        let user = await db.User.findOne({ where: { nom: nom } })
        if(user !== null) {
            throw new CustomError(`L'utilisateur nommé ${nom} existe déjà`, 409)
        }

        // Vérification si le mot de passe correspond aux attentes minimales
        let checkPass = schema.validate(password, { list: true })
        if(checkPass.length != 0) {
            throw new CustomError("Le mot de passe doit contenir au minimum 8 caractères dont une minuscule, une majuscule, des chiffres, des symboles et sans espace.", 400)
        }

        // Création de l'utilisateur
        user = await db.User.create(req.body)

        return res.json({ message: "L'utilisateur a été créé ", data:user })
    } catch(err) {
        next(err)
    }
}

// Connexion d'un utilisateur
exports.login = async (req, res, next) => {
    try {
        // Récupération des données saisies
        const { nom, password } = req.body

        // Validation des données
        if(!nom || !password) {
            throw new CustomError("Un champ à remplir est manquant", 400)
        }

        // Vérification de l'existance de l'utilisateur
        let user = await db.User.findOne({ where: { nom: nom } })
        if(user === null) {
            throw new CustomError("Identifiants incorrects. Veuillez réessayer.", 404)
        }

        // Vérification du password
        let testPassword = await db.User.checkPassword(password, user.password)
        if(!testPassword) {
            throw new CustomError("Identifiants incorrects. Veuillez réessayer.", 401)
        }

        // Génération du token de connexion
        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

        return res.json({ access_token: token })
    } catch(err) {
        next(err)
    }
}