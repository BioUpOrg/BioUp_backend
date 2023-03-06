const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pic : { type: String, required: false },
  password: { type: String, required: false },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
