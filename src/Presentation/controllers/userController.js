const userService = require('../../Application/UseCases/user/userService');
const user = require('../../Domain/Entities/user')

const addUser = async (req, res) => {
  try {
    const user = req.body; // assuming user details are passed in the request body
    const createdUser = await userService.addUser(user);
    res.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addUser,
};
