 const Contract =require('../../../Infrastructure/Models/contratModel');
const addContract = async (c)=>{
    try {
        const contract = await Contract.create(c);
      return contract ; 
    } catch (error) {
        console.log(error,"could not create a contract ")

    }

}
module.exports={addContract};