const userService = require('../../Application/UseCases/user/userService');
const User = require('../../Infrastructure/Models/userModel');



//Create New User
const addUser = async (req, res) => {
  try {
    const userIsExist = (await User.exists({ email: req.body.email })) || null;
    if (userIsExist) {
      return res.status(409).send({ error: 'User is already registered' });
    }

    const user = new User({
      ...req.body,
    });
    await user.save();
    const token = await user.generateAuthToken();
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .status(201)
      .send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    return res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};


const getUsersList= async(req,res)=>{
try{
  const users = await User.find().select('firstName password email role');
  res.send(users);
}catch(e){
  res.status(500).send({error:e})
}
}


module.exports = {
  addUser,getUserById,getUsersList
};
