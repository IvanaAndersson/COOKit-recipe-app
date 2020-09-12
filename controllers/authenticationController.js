const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

const initializePassport = require("../passport-config");
initializePassport(
  passport,
  (email) => User.findOne({ email: email }).then((result) => result),
  (id) => User.findById(id).then((result) => result)
);

const login_get = (req, res) => {
  res.render("login.ejs", { title: "Log In" });
};

const login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

const register_get = (req, res) => {
  res.render("register.ejs", { title: "Register" });
};

const register_post = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    user.save().then((result) => {
      res.redirect("/login");
    });
  } catch (err) {
    res.redirect("/register");
  }
};

module.exports = {
  login_get,
  login_post,
  register_get,
  register_post,
};
