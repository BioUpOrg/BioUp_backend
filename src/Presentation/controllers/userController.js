const userService = require('../../Application/UseCases/user/userService');
const User = require('../../Infrastructure/Models/userModel');
const utils=require('../../Presentation/utils/verifaccountutils');
const getSmsToken=require('../../Presentation/middlwares/getSmsToken');
const userServ =require('../../Application/UseCases/user/userService');

 const sendActivateCodeMail = async (req, res) => {
  try{
    console.log(req.params.mail);
      const user =await userServ.activationMail(req.params.mail);
      console.log(user);
   res.status(200).send(user);
}

catch(e){
 res.status(500).send('error updating activation code '+e);
}
}



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

const sendActivateCodeSmS= async (req, res) => {
  try{
    const activationcode =utils.getActivationCode(); 
    const phone=req.params.phone;
    const update= {activationCode:activationcode};
    const user= await User.findOneAndUpdate({phone:phone},update,{new:true});
    const clientId ='SkRqc3REeEVHQ09UdHFFUlZQS0kwVEdZMjNvalhJTHk6cnVKcmFYUWRsM0loZkVmdg==';
    const context_activation_via_sms='please use this code in bio up  website to activate your account ';
    await getSmsToken(clientId,phone,activationcode,context_activation_via_sms);
    res.status(200).send(user);
}
catch(e){
  res.status(500).send('error get token '+e);
}
}


const verifyAccountSms = async (req, res) => {
  const smscode = req.params.smscode;
  if (smscode) {
    const user = await User.findOne({activationCode:smscode}); 
    if (user) {
      user.statusActivation = true;
      await user.save();
      res.status(200).send(user);
    }else{
      res.status(403).send({err: 'activation code invalid'});
    }
  }
   
}


module.exports = {
  sendActivateCodeMail,verifyAccountMail,sendActivateCodeSmS,verifyAccountSms
};
