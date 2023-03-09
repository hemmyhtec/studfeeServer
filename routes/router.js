const express = require('express');
const functions = require('../controller/functions');
const router = express.Router()
const auth = require('../middleware/jwt')
const authTwo = require('../middleware/jwt_web')
const validate = require('../middleware/validator')
const validateTwo = require('../middleware/validatorTwo')
const { check } = require('express-validator');
const adminController = require('../controller/adminController');


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
    res.clearCookie('x-auth-token');
    res.status(200).json({ msg: 'Sign-out successful' });
})

router.get('/getUserProfileUrl', auth, functions.getUserProfileImage)

// Render Admin Registration Form
router.get('/register-admin', (req, res) => {
  res.render('admin/register');
});

//Admin Routes
router.post('/register-admin', [
    check('fullname', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password)
  ], validate, adminController.registerAdmin)

// Render Admin Registration Form
router.get('/signin', (req, res) => {
  res.render('admin/signin');
});

//Admin Routes
router.post('/signin', [
    check('email', 'Please include a valid email').isEmail().withMessage('Invalid email'),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
  ], validateTwo, adminController.signInUser)


  router.get('/admin/dashboard', authTwo, adminController.getAllPayementList, (req, res) => {
    res.render('admin/dashboard');
  });
  
  router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.render('admin/signin');
  });

//Admin Routes
router.post('/create-form', [
  check('dapartmentName', 'Department name required').not().isEmpty(),
  check('levyName', 'Levy name required').not().isEmpty(),
  check('feeAmount', 'Fee amount required').not().isEmpty(),
], validateTwo, authTwo, adminController.createForm)

router.get('/verifyAdmin/:token', adminController.verifyAdmin)




module.exports = router