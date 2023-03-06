const userService = require('../../Application/UseCases/user/userService');
const User = require('../../Infrastructure/Models/userModel');
const utils=require('../../Presentation/utils/verifaccountutils');
const sendEmail=require('../../Presentation/middlwares/sendEmail');



 const sendActivateCodeMail = async (req, res) => {
  try{
   const activationCode =utils.getActivationCode(); 
  // const expireDate=utils.getActivationCodeExpDate();
   const mail=req.params.mail;
   const update= {activationCode:activationCode};
   const user= await User.findOneAndUpdate({email:mail},update,{new:true});
   const token=utils.generateActivationtoken(mail,activationCode);
   const URL_ACTIVE_ACCOUNT='http://localhost:3000/users/check/activate/account/'+token;
   await sendEmail(mail,URL_ACTIVE_ACCOUNT);
   res.status(200).send(user);
}

catch(e){
 res.status(500).send('error updating activation code '+e);
}}



const verifyAccountMail=  async (req, res) => {
  const token = req.params.token;
  console.log(token);
  const result = utils.decryptActivateToken(token);
  console.log(result);
  if
   (result) {
    const email = result.email;
    console.log(email);
    const user = await User.findOne({email: email});
    console.log(user.activationCode);
    console.log(result.activationCode);
    if (user.activationCode===result.activationCode) {
      user.statusActivation=true;
      await user.save();
      res.status(200).send(user);
    } else {
      res.status(403).send({err: 'activation code invalid'});
    }
  } else {
    res.status(500).send('link expired');
  }
}




module.exports = {
  sendActivateCodeMail,verifyAccountMail
};
