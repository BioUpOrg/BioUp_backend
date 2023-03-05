const userRepository = require('../../../Domain/IRepositories/UserRepository');

const addUser = async (user) => {
  try {
    return await userRepository.create(user);
  } catch (err) {
    console.error(err);
    throw new Error('Could not create user');
  }
};

module.exports = {
  addUser,
};
