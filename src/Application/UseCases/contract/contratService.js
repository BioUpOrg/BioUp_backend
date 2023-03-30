 const Contract =require('../../../Infrastructure/Models/contratModel');
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
module.exports={addContract,FindContractByUserID};