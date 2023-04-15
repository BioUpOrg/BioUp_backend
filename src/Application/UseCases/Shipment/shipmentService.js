const Shipment= require('../../../Infrastructure/Models/shipmentModel'); 
const Commande=require('../../../Infrastructure/Models/commandModel');
const addShipment = async (s)=>{
    // Add shipment
    try{
        const commandes=s.shipment_items; 
        commandes.forEach(async (c)=>{
            const updatestatus={status:true};
            const idcommande=c.commande_id;
            await Commande.findOneAndUpdate({_id:idcommande},updatestatus,{new:true}).then((res)=>{
                console.log("status commande updated ", idcommande +"to"+ res);

            })
        });
            console.log("all commandes updated")
            const shipment=  await Shipment.create(s); 
            return shipment;
        }
           

    
    catch(e){
        console.log(e,"could not add shipment");
    }
 
}
module.exports={addShipment};