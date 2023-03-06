const userRepository = require('../../../Domain/IRepositories/UserRepository');
const utils=require('../../../Presentation/utils/verifaccountutils');
const sendEmail=require('../../../Presentation/middlwares/sendEmail');
const User =require('../../../Infrastructure/Models/userModel');
const addUser = async (user) => {
  try {
    return await userRepository.create(user);
  } catch (err) {
    console.error(err);
    throw new Error('Could not create user');
  }
};

const activationMail = async (mail)=>{
  console.log(mail);
  const activationCode =utils.getActivationCode(); 
  console.log(activationCode);
  // const expireDate=utils.getActivationCodeExpDate();
   const update= {activationCode:activationCode};
   const user= await User.findOneAndUpdate({email:mail},update,{new:true});
   const token=utils.generateActivationtoken(mail,activationCode);
   const URL_ACTIVE_ACCOUNT='http://localhost:3000/users/check/activate/account/'+token;
   await sendEmail(mail,URL_ACTIVE_ACCOUNT);
   return user;
}


module.exports = {
  addUser,activationMail
};

