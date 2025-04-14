const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: './images/defaultProfile.jpeg'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, { timestamps: true }
);

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    
        this.salt = salt;
        this.password = hashedPassword;
        return next();
    } catch (error) {
        console.log(error);
    }
})

userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({
        email
    });
    if (!user) return { error: true, message: 'email does not exists' };
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    user.password = null;
    user.salt = null;

    if (userProvidedHash === hashedPassword) return {
        user: {...user}
    }
    return {
        error: true,
        message: 'wrong password'
    }
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel