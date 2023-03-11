const express = require('express');
const passport = require("passport");

 
const googleRouter = express.Router();
googleRouter.get('/', (req, res) => {
	res.send("<button><a href='google/auth'>Login With Google</a></button>")
});

// Auth
googleRouter.get('/auth' , passport.authenticate('google', { scope:
	[ 'email', 'profile' ]
}));

// Auth Callback
googleRouter.get( '/auth/callback',
	passport.authenticate( 'google', {
		successRedirect: '/google/auth/callback/success',
		failureRedirect: '/google/auth/callback/failure'
}));

// Success
googleRouter.get('/auth/callback/success' , (req , res) => {
	if(!req.user)
		res.redirect('/auth/callback/failure');
	res.send("Welcome " + req.user.email);
});

// failure
googleRouter.get('/auth/callback/failure' , (req , res) => {
	res.send("Error");
})

googleRouter.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/google');
});

module.exports = googleRouter;
