const crypto = require("crypto");
const nodemailer = require("nodemailer");
const async = require("async");
const User = require("../models/user");
const passport = require("passport");

const registerUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.json({ error: "Email already exists" });
    }

    if (!foundUser) {
      const body = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      };
      const newUser = await new User(body);
      req.body.username = newUser.username;
      return User.register(newUser, req.body.password, err => {
        if (err) {
          return res.json({ error: err.message });
        }
        return passport.authenticate("local")(req, res, () => {
          if (req.user) {
            return res.json(req.user);
          }
          return res.json({ error: "There was an error registering the user" });
        });
      });
    }
    // return an error if all else fails
    return res.json({ error: "There was an error registering the user" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      req.body.username = foundUser.username;
    }
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const checkSession = (req, res) => {
  return res.json(req.user);
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const forgetPassword = (req, res) => {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          const token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.json({ error: "No account with that email address exists." });
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        const smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "WILL BE ADDED LATER",
            pass: "WILL BE ADDED LATER"
          }
        });
        const mailOptions = {
          to: user.email,
          from: "",
          subject: "Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log("mail sent");
          done(err, "done");
          res.json({ success: "Mail sent" });
        });
      }
    ],
    function(err) {
      if (err) res.json({ err });
    }
  );
};

const resetToken = async (req, res) => {
  try {
    const password = req.body.password;
    const confirm = req.body.confirm;
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (user) {
      if (password === confirm) {
        const updatedpassword = await user.setPassword(password);
        updatedpassword.resetPasswordExpires = undefined;
        updatedpassword.resetPasswordToken = undefined;
        await updatedpassword.save();
        const smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "WILL BE ADDED LATER",
            pass: "WILL BE ADDED LATER"
          }
        });
        const mailOptions = {
          to: user.email,
          from: "WILL BE ADDED LATER",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          if (err) {
            res.json(err);
            return;
          }
          res.json({ success: "Success! Your password has been changed." });
        });
      } else {
        res.json({ error: "Passwords do not match." });
      }
    } else {
      res.json({ error: "Password reset token is invalid or has expired." });
    }
  } catch (error) {
    res.json(error);
  }
};
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.json({ message: "Please log in" });
  }
};
module.exports = {
  loginUser,
  registerUser,
  checkSession,
  getUsers,
  forgetPassword,
  resetToken,
  isLoggedIn
};
