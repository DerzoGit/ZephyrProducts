const errorHandler = (err, req, res, next) => {

    // 0 = Message simple
    // 1 = Message sans erreur
    // 2 = Message avec toutes les infos
    debugLevel = 0
    message = {}

    // Affichage plus ou moins complet des erreurs selon le niveau
    switch(debugLevel) {
        case 0:
            message = { message: err.message }
            if(err.name == "SequelizeDatabaseError") {
                message = { message: "Database Error" }
            }
            break
        case 1:
            message = { message: err.message }
            break
        case 2:
            message = { message: err.message, error: err }
            break
        default:
            console.log("Bad debugLevel")
    }

    return res.status(err.statusCode || 500).json(message)
}

module.exports = errorHandler