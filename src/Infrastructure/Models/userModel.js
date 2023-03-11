const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: `${__dirname}/../Database/.env` });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  phone:{ type: String,default:''},
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date ,default:''},
  activationCode:{type :String,default:''},
  isActivated: { type: Boolean, default: true },
  statusActivation:{type:Boolean,default:false},
  role: { type: String, default: 'user' },
  uid: {type: String},
  gender: {type : String} ,
  pic:{type : String} ,
  token:{type : String} ,



  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

});

userSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      role: user.role,
    },
    process.env.PRIVATEKEY
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function findByCredentials(
  email,
  password
) {
  const user = await userModel.findOne({ email });
  if (!user) {
    const error = new Error(
      'Impossible de se connecter , utilisateur non enregistré'
    );
    error.code = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error(
      'Impossible de se connecter, email ou mot de passe incorrecte'
    );
    error.code = 401;
    throw error;
  }
  return user;
};

// Hash the plain text password before saving
userSchema.pre('save', function preSave(next) {
  try {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(8, (err, salt) => {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, (bcryptError, hash) => {
        if (bcryptError) return next(bcryptError);

        // override the cleartext password with the hashed one
        user.password = hash;
        return next();
      });
    });
  } catch (e) {
    throw e;
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
