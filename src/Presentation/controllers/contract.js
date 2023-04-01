const contServ =require('../../Application/UseCases/contract/contratService');

const addContract = async (req,res) => {
    try {
        const contract = req.body.data;
         await contServ.addContract(contract);
         console.log(contract);
        res.status(200).send(contract);
        
    } catch (err) {
        console.error(err);
        throw new Error('Could not create contract');
    }
}
const FindContractByUserID = async (req,res) => {
    try {
        const userid = req.params.userid;
        const cont= await contServ.FindContractByUserID(userid);
         console.log("cont c id",userid);
        res.status(200).json(cont);
        
    } catch (err) {
        console.error(err);
        throw new Error('Could not  find user  contract');
    }
}

module.exports={addContract,FindContractByUserID}; 