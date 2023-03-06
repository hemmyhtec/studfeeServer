require("dotenv").config;

const Admin = require('../models/Admin')
const nodemailer = require("nodemailer");

const secretCode = process.env.SECRET_CODE;

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});
function renderSuccessPageWithRedirect(req, res, msg, redirectUrl) {
    res.render('success', { msg });
  
    setTimeout(() => {
      res.redirect(redirectUrl);
    }, 3000);
  }
function renderErrorPageWithRedirect(req, res, msg, redirectUrl) {
    res.render('error', { msg });
  
    setTimeout(() => {
      res.redirect(redirectUrl);
    }, 3000);
  }

const adminController = {
    registerAdmin: async function(req, res){
        try {
           const {fullname, email, password } = req.body
           
           const user = await Admin.findOne({ email });
           if(user){
            return renderErrorPageWithRedirect(req, res, 'You already have an account', 'registerAdmin')  
           } 
            
           user = new Admin({
            fullname,
            email,
            password
           })

           user.save().then((user)=> {
            try {
                const token = user.generateVerificationToken();
                token.save();
    
                let link =
                  "http://" + req.headers.host + "/verifyUser/" + token.token;
    
                const mailOptions = {
                  from: process.env.EMAIL_ADDRESS,
                  to: user.email,
                  subject: "Account Veritification Token",
                  html: `<p style="font-size: 25px; font-weight: 500; font-style: italic;">Dear ${user.fullname} 👋</p><p>We are excited to have you join our community 😇! <br> As a member, you now have access to a wide range of features and benefits.</p>
                  <p>To get started, please verify your account using the Link: </p> <p style="font-size: 30px; font-weight: bold;">${link}</p><p>This OTP Code <b> expires in 1hour</b></p> <p>Thank you again for joining Us <br> We look forward to seeing you on the site and hope you have a great experience! </p><p>Best regards</p>`,
                };
    
                transporter
                  .sendMail(mailOptions)
                  .then(() => {
                   return renderSuccessPageWithRedirect(req, res, `Thanks for registering with us. Please check your Email: ${user.email} for verification link.`, 'loginAdmin')
                  })
                  .catch(() => {
                    return renderErrorPageWithRedirect(req, res, 'Email error', 'registerAdmin')  
                  });
              } catch (err) {
                return renderErrorPageWithRedirect(req, res, err.message, 'registerAdmin')  
              }
           })
        } catch (err) {
            return renderErrorPageWithRedirect(req, res, err.message, 'registerAdmin')  
        }
    }
}

module.exports = adminController;