const User = require('../../Infrastructure/Models/userModel');
const passport = require("passport");
const dotenv = require ("dotenv");
const strategy = require ("passport-facebook");
const facebookStrategy = require('passport-facebook').Strategy


const FacebookStrategy = strategy.Strategy;

dotenv.config();
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});
passport.use(new facebookStrategy({

  // pull in our app id and secret from our auth.js file
  clientID        : "954494482593458",
  clientSecret    : "0ac6ad1851a8b714310a4ff90cbf5e05",
  callbackURL     : BACK_BASE_URL+"fb/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

  // asynchronous

  process.nextTick(function() {

      // find the user in the database based on their facebook id

      User.findOne({ 'uid' : profile.id }, function(err, user) {
        console.log("profile id "+profile.emails[0].value)
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
              return done(err);

          // if the user is found, then log them in
          if (user) {
              console.log("user found")
              console.log(user)
              return done(null, user); // user found, return that user
          } else {
              // if there is no user found with that facebook id, create them
              var newUser            = new User();

              // set all of the facebook information in our user model
              newUser.uid    = profile.id; // set the users facebook id                   
              newUser.token = token; // we will save the token that facebook provides to the user                    
              newUser.firstName  = profile.name.givenName// look at the passport user profile to see how names are returned
              newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
              newUser.gender = profile.gender
           //   newUser.pic = profile.photos[0].value
              // save our user to the database
              newUser.save(function(err) {
                  if (err){
                      console.log("error")
                      throw err;
                  }
                  console.log("user saved")
                  // if successful, return the new user
                  return done(null, newUser);
              });
          }

      }
      
      );

  })

}));