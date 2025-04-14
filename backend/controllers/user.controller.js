const UserModel = require('../models/user.model');
const { createTokenForUser, validateToken } = require('../services/auth');

async function register(req, res) {
    console.log(req.body)
    const { name, email, password, role } = req.body.userDetails;
    const profileImageUrl = req.file;
    if (!name || !email || !password || !role) {
        console.log('Missing user details');
        return res.status(400).json({ error: true, message: 'missing user details' });
    }
    try {
        await UserModel.create({
            name, email, password, role
        })

        return res.status(201).json({ message: 'User created succesfully' });
    } catch (err) {
        console.log('email already registered');
        return res.status(400).json({error: true, message: "email is already registered"});
    }
}

async function login(req, res) {
    const { email, password } = req.body.userDetails;
    console.log({ email, password });
    
    if (!email || !password) {
        console.log('missing credentials');
        return res.status(401).json({ error: true, message: 'missing user credentials' });
}
    const exists = await UserModel.matchPassword(email, password);
    
    if (exists?.error) {
        console.log(exists.message);
        return res.status(404).json(exists);
    }

    const token = createTokenForUser(exists.user._doc)
    return res.status(202).json({ token });
}

function verifyToken(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const user = validateToken(token);
    if (!user) return res.status(404).json({
        error: true,
        message: "invalid token"
    })
    return res.status(202).json(user);
}

module.exports = {
    register,
    login,
    verifyToken
}