const jwt = require('jsonwebtoken');

const User = require('../../Infrastructure/Models/userModel');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.PRIVATEKEY);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ errorMessage: 'Please authenticate.' });
  }
};

module.exports = auth;
