const express = require('express');
const functions = require('../controller/functions');
const router = express.Router()
const auth = require('../middleware/jwt')
const validate = require('../middleware/validator')
const { check } = require('express-validator');


router.post('/register', functions.verifyUserAndRegister)

router.get('/verifyUser/:token', functions.verifyUser)

router.post('/userSign', functions.signUserIn)

router.post('/tokenIsValid', functions.tokenIsValid)

router.get('/getUserData', auth, functions.getUserData)

router.put('/updateData', auth, functions.updateProfile)

router.get('/payments', auth, functions.getPayment)

router.post('/paymentsProcess', auth, functions.paymentApi)

router.get('/paymentsHistory', auth, functions.getPaymentHistory)

router.get('/users', auth, functions.getAllUsers)

router.get('/users/:admissionNumber', auth, functions.getUserByAdmission)

router.post('/createChats', auth, functions.createChat)

router.get('/chats/:sender:/receiver', auth, functions.getUserChat)

router.post('/resetPasswordToken', functions.createResetPasswordToken)

router.get('/reset/:token', functions.reset )

router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({ min: 8 }).withMessage('Must be at least 8 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
], validate, functions.resetPassword)

router.get('/success')
router.get('/error')

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

router.get('/getUserProfileUrl', auth, functions.getUserProfileImage)


module.exports = router