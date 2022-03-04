const UserSchema = require('../Models/UserSchema')
const sendEmail = require('../Utils/sendEmail')
const crypto = require('crypto')


exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    try {
        const userExist = await UserSchema.exists({ email })
        if (userExist) return res.send({
            success: false,
            messege: "Email already in use"
        })

        const saveSchema = await new UserSchema({
            firstName,
            lastName,
            email,
            password
        })
        const result = await saveSchema.save()
        if (result) {
            return res.send({
                status: true,
                messege: 'Registered Succesfully'
            })
        }
    } catch (err) {
        console.log(err)
    }

}
exports.login = async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password) {
        return res.json({
            success: false,
            messege: "Invalid Credentials"
        })
    }
    try {
        const user = await UserSchema.findOne({ email }).select('+password')
        if (!user) {
            return res.status(400).send({
                success: false,
                messege: "User Not Found"
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).send({ success: false, messege: 'Invalid Credentials' })
        }

        sendToken(user, 200, res)

    } catch (err) {
        if (err) {
            return res.status(400).send('Invalid Credentials')
        }
    }
}

exports.checkCode = async (req, res, next) => {
    const { code } = req.body
    const user = await UserSchema.findOne({ resetCode: code });
    if (!user) {
        return res.send({
            success: false,
            messege: 'Please Enter a valid Code'
        })
    }

    if (user.resetCodeExpire < Date.now()) {
        return res.send({
            success: false,
            messege: 'Code Expired'
        })
    }
    res.send({
        success: true,
        messege: 'Code Verified'
    })

}

exports.forgotPassword = async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;

    try {
        const user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                messege: 'Email does not exist'
            })
        }


        // Reset Token Gen and add to database hashed (private) version of token
        const { resetToken, randomNumber } = user.getResetPasswordToken();

        console.log(resetToken, "auth.js")

        await user.save();

        // Create reset url to email to provided email
        // const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Enter this code to continue : ${randomNumber}</p>
        `;
        // <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent", resetToken });
        } catch (err) {
            console.log(err);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return res.status(401).send({
                success: false,
                messege: 'Could not send email'
            })
        }
    } catch (err) {
        next(err);
    }
};
exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    // const resetPasswordToken = crypto
    //     .createHash("sha256")
    //     .update(req.params.resetToken)
    //     .digest("hex");
    const resetPasswordToken = req.params.resetToken

    try {
        const user = await UserSchema.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.send({
                success: false,
                messege: 'Cannot Send Email'
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.resetCode = undefined;
        user.resetCodeExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Success",
        });
    } catch (err) {
        console.log(err)
    }
}

exports.verify = async (req, res, next) => {
    const id = req.id
    const user = await UserSchema.findById(id)
    res.send({
        success: true,
        user
    })
}



const sendToken = (user, statusCode, res) => {
    const accessToken = user.getSignedJwtToken();
    res.status(statusCode).json({ status: true, accessToken , user });
};
