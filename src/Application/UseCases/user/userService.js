const userRepository = require('../../../Domain/IRepositories/UserRepository');
const utils=require('../../../Presentation/utils/verifaccountutils');
const sendEmail=require('../../../Presentation/middlwares/sendEmail');
const User =require('../../../Infrastructure/Models/userModel');
const { sendActivateCodeSmS } = require('../../../Presentation/controllers/userController');
const getSmsToken = require('../../../Presentation/middlwares/getSmsToken');
const addUser = async (user) => {
  try {
    return await userRepository.create(user);
  } catch (err) {
    console.error(err);
    throw new Error('Could not create user');
  }
};

const userLogin= async (user) => {
  const searchedUser = await User.findByCredentials(user.email,user.password);
  const token = await searchedUser.generateAuthToken();
  return token ;
}
const userLoginfb= async (user) => {
  const searchedUser = await User.findByCredentialsfb(user.email);
  const token = await searchedUser.generateAuthToken();
  return token ;
}

const activationMail = async (mail)=>{
  console.log(mail);
  const activationCode =utils.getActivationCode(); 
  console.log(activationCode);
  // const expireDate=utils.getActivationCodeExpDate();
   const update= {activationCode:activationCode};
   const user= await User.findOneAndUpdate({email:mail},update,{new:true});
   const token=utils.generateActivationtoken(mail,activationCode);
   const URL_ACTIVE_ACCOUNT='http://localhost:4000/users/check/activate/account/'+token;
   await sendEmail(mail,URL_ACTIVE_ACCOUNT);
   return user;
}

const verifyActivationCodeMail = async (token)=>{
  console.log(token);
  const result = utils.decryptActivateToken(token);
  console.log(result);
 
    const email = result.email;
    console.log(email);
    const user = await User.findOne({email: email});
    console.log(user.activationCode);
    console.log(result.activationCode);
    if (user.activationCode===result.activationCode) {
      user.statusActivation=true;
      await user.save();
      return user ;
    } else {
      res.status(403).send({err: 'activation code invalid'});
    }
}

 const sendActivationCodeBySms = async(phone)=>{
  
  const activationcode =utils.getActivationCode(); 
  const update= {activationCode:activationcode};
  const user= await User.findOneAndUpdate({phone:phone},update,{new:true});
  const clientId ='SkRqc3REeEVHQ09UdHFFUlZQS0kwVEdZMjNvalhJTHk6cnVKcmFYUWRsM0loZkVmdg==';
  const context_activation_via_sms='please use this code in bio up  website to activate your account ';
  await getSmsToken(clientId,phone,activationcode,context_activation_via_sms);
  return user;

 }


 const sendCodeRecPassSms = async (phone) =>{
 const number =phone;
 console.log(number);
 const coderecp= await utils.getActivationCode();
const update={codeRecuperation:coderecp};
 const user = await User.findOneAndUpdate({phone:number},update,{new:true});
    const clientId ='SkRqc3REeEVHQ09UdHFFUlZQS0kwVEdZMjNvalhJTHk6cnVKcmFYUWRsM0loZkVmdg==';
    const context_activation_via_sms='please use this code in bio up  website to Create a new Password  ';
       getSmsToken(clientId,number,coderecp,context_activation_via_sms);
       user.save();
      console.log(user)
      return user ;
      

 }

 const verifyCodeRecPassSms = async (phone, code) => {
  const user = await User.findOne({ phone });
  console.log("uu",phone)
  console.log("hjboj",code)

  if (!user) {
    throw new Error('User not found');
  }
  if (user.codeRecuperation !== code) {
    throw new Error('Invalid code');
  }
  else{
    user.codeRecuperation="1";
    user.save();
  }
  return user;
};




   const changedPass=async (number,password)=>{
    console.log(number);
    console.log(password);
    if(number){
      
        const user=await User.findOne({phone:number});
        
        if(user){
          if(user.codeRecuperation !=="1"){
            return ('you must verify the code first !');
          }
          if(user.codeRecuperation =="1"){
            user.password=password; 
            user.save();
            return user;
           }
          
        }
       
  
    }
    
  }

  const verifyIfPhoneExistence =  async (phone)=>{
    const user = await User.findOne({phone:phone});
    if(user){
      return "exist";
    }
    else{
      return "not exist";
    }
  }



module.exports = {

  addUser,userLogin,activationMail,verifyActivationCodeMail,
  sendCodeRecPassSms,verifyCodeRecPassSms,changedPass,sendActivationCodeBySms,userLoginfb,verifyIfPhoneExistence

};
