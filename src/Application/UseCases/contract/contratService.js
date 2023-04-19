 const { response } = require('express');
const Contract =require('../../../Infrastructure/Models/contratModel');
const { update } = require('../../../Infrastructure/Models/userModel');
const addContract = async (c)=>{
    try {
        const contract = await Contract.create(c);
      return contract ; 
    } catch (error) {
        console.log(error,"could not create a contract ")

    }

}
const FindContractByUserID=async(userid)=>{
    try{
        console.log("serv c id ", userid);
        const contract=await Contract.findOne({user:userid});
        return contract;
    }
    catch(error){
        console.log(error,"could not find a contract by user id")
    }
}
const saveSignature=async(signature,userid)=>{
    try{
      const  update= {signature:signature};
        const sig=await Contract.findOneAndUpdate({user:userid},update,{new:true}).then(response=>{
            console.log(response);
        })
    }catch(e){
        console.log(e,"could not save signature")
    }
}
const getAllContracts=async()=>{
    try{
        const contracts=await Contract.find().populate("user");
        return contracts;
    }
    catch(e){
        console.log(e,"could not get all contracts")
    }
}
const acceptContract=async(contractid)=>{
    try{
        
        const contract=await Contract.findByIdAndUpdate({_id:contractid},{new:true}).populate("user");
        contract.user.role="user";
        contract.statuscontract=true;
        contract.save();
        return contract;
    }catch(e){
        console.log(e,"could not accept contract");
    }

}
module.exports={addContract,FindContractByUserID,saveSignature,getAllContracts,acceptContract};