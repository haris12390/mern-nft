const express = require('express')
const router = express.Router()
const { login, register, forgotPassword, resetPassword, verify, checkCode } = require('../Controllers/auth')
const { tokenVerify } = require('../middleware/tokenVerify')

router.post("/register", register)
router.post("/login", login)
router.post("/forgotpassword", forgotPassword)
router.put("/passwordreset/:resetToken", resetPassword)
router.post("/verify", tokenVerify, verify)
router.post("/verifycode", checkCode)


module.exports = router;
