const jwt = require('jsonwebtoken');

class TokenService {
    getToken(user) {
        const secret = 'r13wet5ret46we1t5ewr1g3s1f65w4rq';

        return jwt.sign({
            id: user.id, nome: user.nome, email: user.email
        }, secret, {expiresIn: 86400});
    }
}

module.exports = new TokenService();