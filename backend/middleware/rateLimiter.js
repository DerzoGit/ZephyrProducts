const rateLimiter = require('express-rate-limit')

const loginLimiter = rateLimiter({
    max: 5,
    windowMs: 1000 * 30,
    message: "Veuillez attendre quelques instants avant de recommencer.",
    standardHeaders: false,
    legecyHeaders: false
})

module.exports = { 
    loginLimiter
}