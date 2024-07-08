const express = require('express')
const cors = require('express')
const helmet = require('helmet')
const errorHandler = require('./middleware/errorHandler')

// Import de la connexion DB
let DB = require('./db.config')

// Initialisation API express
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())


// Import des routes
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')

// Mise en place routage
app.get("/", (req, res) => res.send("Server online"))
app.use("/auth", authRoutes)
app.use("/products", productRoutes)

app.get("*", (req, res) => res.status(501).send("Where are you going ?"))

// Middleware errorHandler qui permet la gestion des messages d'erreurs
app.use(errorHandler)

DB.sequelize.authenticate()
    .then(() => console.log("Database connection's OK"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}.`)
        })
    })
    .catch(err => console.log("Database error", err))