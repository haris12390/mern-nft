const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: {
        required: true, type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ]
    },
    password: { required: true, type: String, minlength: 6, select: false },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    subAccountOf: {
        type: String,
        default: null
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    resetCode: String,
    resetCodeExpire: Date,
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(30).toString("hex");
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    console.log(resetToken, "resetToken")

    // Hash token (private key) and save to database
    // this.resetPasswordToken = crypto
    //     .createHash("sha256")
    //     .update(resetToken)
    //     .digest("hex");
    this.resetPasswordToken = resetToken

    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

    this.resetCode = randomNumber

    this.resetCodeExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes


    return {
        resetToken,
        randomNumber
    };
};

const User = mongoose.model('Users', UserSchema)

module.exports = User