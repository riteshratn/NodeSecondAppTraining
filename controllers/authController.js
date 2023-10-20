const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passport = require('passport');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '0923riteshkumar@gmail.com',
    pass: 'ekhietjloouoigak'
  }
});

const users = [];

exports.showLogin = (req, res) => {
  res.render('login.ejs');
};


exports.loginUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };

    const mailOptions = {
      from: '0923riteshkumar@gmail.com',
      to: user.email,
      subject: 'Registration Successful',
      text: 'Thank you for registering on our website.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent ');
      }
    });

    users.push(user);

    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
};

exports.logoutUser = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};
