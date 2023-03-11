const userService = require('../../Application/UseCases/user/userService');
const User = require('../../Infrastructure/Models/userModel');
const utils=require('../../Presentation/utils/verifaccountutils');
const getSmsToken=require('../../Presentation/middlwares/getSmsToken');
const userServ =require('../../Application/UseCases/user/userService');

const login = async (req, res) => {
  try {
    const user = req.body;
    const token = await userService.userLogin(user);
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .status(200)
      .send({ token });
  } catch (e) {
    res.status(e.code || 400).send({ error: e.message });
  }
};

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

const verifyAccountMail =  async (req, res) => {
  try{
    const user =await userServ.verifyActivationCodeMail(req.params.token); 
    console.log(user);
    res.status(200).send(user);

    //
  }catch(e){
    res.status(500).send('link expire '+e);
  }
 
}

const sendActivateCodeSmS= async (req, res) => {
  try{
    console.log(req.params.phone);
    const user =await userServ.sendActivationCodeBySms(req.params.phone);
    console.log(user);
    res.status(200).send(user);
  }
  catch(e){ 
    res.status(500).send('error updating activation code '+e);
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
const sendCodeRecBySms =async (req,res)=>{
  try{
    const user = await userServ.sendCodeRecPassSms(req.params.phone);
    console.log(user);
    res.status(200).send(user);
  }catch(e){
    res.status(500).send('error get token '+e);
  }
}

const verifyCodeRecBySms = async (req, res) => {
  const { phone, code } = req.body;
  try {
    const user = await userServ.verifyCodeRecPassSms(phone, code);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const changePass =async (req,res)=>{
  const {phone,password}=req.body;
  try {
    const user = await userServ.changedPass(phone,password);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

 



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
}


const getUsersList= async(req,res)=>{
try{
  const users = await User.find().select('firstName password email role');
  res.send(users);
}catch(e){
  res.status(500).send({error:e})
}
}

//Desactivate User Account

const DesactivateUserAccount = async (req, res) => {
  const user = await User.findById(req.params._id);
  try {
    user.isActivated = false;
    await user.save();
    res.status(200).send({ message: 'Action completed successfully!' });
  } catch (e) {
    res.status(400).send(e);
  }
}



module.exports = {
  login,
  sendActivateCodeMail,verifyAccountMail,sendActivateCodeSmS,verifyAccountSms,
sendCodeRecBySms,verifyCodeRecBySms,changePass,getUserById,getUsersList,DesactivateUserAccount,addUser
};