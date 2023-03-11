const express = require('express');
const passport = require("passport");
const userController = require( "../controllers/facebookConnect");

 
const userRouter = express.Router();

userRouter.get("/auth/facebook", passport.authenticate("facebook"));

userRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/fb/profile",
    failureRedirect: "/fb/fail"
  })
);
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
userRouter.get('/profile', isLoggedIn, function(req, res) {
  console.log(req.user)
  res.render('profile', {
      user : req.user // get the user out of session and pass to template
  });
});

userRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

userRouter.get("/", (req, res) => {
  res.send("Success");
});
userRouter.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/fb');
});
module.exports = userRouter;
