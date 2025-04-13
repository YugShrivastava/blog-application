const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.JWT_SECRET;

function createTokenForUser (user) {
    const payload = {
        name: user.name,
        email: user.email,
        _id: user._id,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }

    const token = jwt.sign(payload, secret)

    return token;
}

function validateToken(token) {
    const payload = jwt.verify(token, secret);

    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}