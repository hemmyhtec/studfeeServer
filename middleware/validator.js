const { validationResult } = require('express-validator')


module.exports = (req, res, next) => {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     let error = {};
    //     errors.array().map((err) => error[err.param] = err.msg)
    //     return res.render('error', { msg: 'Password less then 8 or Passwords do not match' });
    // }
    if (!errors.isEmpty()) {
        return res.render('registerAdmin', { errors: errors.array() });
      }
    next()
}