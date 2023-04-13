const jwt = require('jsonwebtoken')

class AuthServices {
    static getToken(payload) {
        try {
            const token = jwt.sign(payload,'jace', {
                algorithm: 'HS512',
                expiresIn:'1d'
            })
            return token;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = AuthServices;