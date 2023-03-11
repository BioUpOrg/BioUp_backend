const User = require('../../Infrastructure/Models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { nextTick } = require('process');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'habibfiras.hadroug@esprit.tn',
      pass: 'habib9999*'
    }
  });
  //
  //
  // Generate a random verification code
  const activationCode = crypto.randomBytes(3).toString('hex'); // 3 bytes will generate a 6-digit hex code
  
  // Define the email content
  const mailOptions = {
    from: 'habibfiras.hadroug@esprit.tn',
    to: 'habibfiras.hadroug@esprit.tn',
    subject: 'Password reset verification code',
    text: `Your password reset verification code is: ${activationCode}`
  };
  
  // Send the email
  const sendps = async (req, res) => {
try{
  console.log(req.body.email)
  const send = transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      const update ={activationCode:activationCode}
      const user=User.findOneAndUpdate({email:req.body.email},update,{new : true}
        
        
        )
        .then((user,err) => {
          if (err) {
            console.log(err);
          } else {
            
            res.json(user);
          }
        }
        )


    }
  });
}catch(err){
  console.log(err)


}
};



const verifps= async (req, res,next) => {
  const user = await User.findOne({email:req.body.email}).then((user,err) => {
    if (err) {
      console.log(err);
    } else {
       if(user.activationCode==req.body.activationCode){
    res.json({message:'code correct'})
    user.activationCode = "1";
    user.save();
    // Set the user object on the request object for later use
    req.user = user;


  }else{
    res.json({message:'code incorrect'})
  }
    }

 

});
}

const changeps= async (req, res) => {
  try{
    const user = await User.findOne({email:req.body.email}).then((user,err) => {
      if(user){
        if(user.activationCode === "1"){
          user.password=req.body.password;
          user.activationCode = "";
          user.save()
          res.json({message:'changed'})

        }
        else{
          res.json({message:'code incorrect'})
        }
      }
      else{
        res.json({message:'user not found'});
      }
     
  
      
    });
  }
  catch(err){
    console.log("err");
  }
 



}






  module.exports = {
    sendps,verifps,changeps
  
  };
  