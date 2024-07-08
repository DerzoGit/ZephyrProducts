class CustomError extends Error {
    constructor(errorMessage, errorType="") {
        super()
        this.name = "CustomError"
        this.message = errorMessage
        this.statusCode = errorType
    }
}

module.exports = { CustomError }