const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String ,default:'' },
  email: { type: String },
  password: { type: String, default: '' },
  phone:{ type: String,default:''},
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date ,default:''},
  activationCode:{type :String,default:''},
  //codeExpireDate:{type:String},
  statusActivation:{type:Boolean,default:false},
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;