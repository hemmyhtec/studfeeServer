const express = require('express');
const functions = require('../controller/functions');
const router = express.Router()
const auth = require('../middleware/jwt')

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

module.exports = router