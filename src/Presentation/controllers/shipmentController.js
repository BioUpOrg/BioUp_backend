const { response } = require('express');
const Commande =require('../../Infrastructure/Models/commandModel');
const shipmentServ = require('.././../Application/UseCases/Shipment/shipmentService');
const findCommandesNotDelivered=async (req,res)=>{

        try {
            const commande = await Commande.find({status:false});
            res.status(200).send(commande);
            console.log(commande);
        } catch (error) {
            console.log(error,"could not find any commande ")
    
        } 
    }
       
 
    const addShipment =async (req,res)=>{
        try {
            const shipment = req.body;
             await shipmentServ.addShipment(shipment);
            res.status(200).send(shipment);
            console.log(shipment);
            
        } catch (err) {
            console.error(err);
            throw new Error('Could not create shipment');
        }
    }
const getMyshipment=async (req,res)=>{
    try {
        const id = req.params.id;
        const myshipment = await shipmentServ.getMyShipment(id);
        res.status(200).send(myshipment);
        console.log(myshipment);
    } catch (error) {
        console.log(error,"could not get my shipment ")
    }
}
module.exports={
    findCommandesNotDelivered,addShipment,getMyshipment
}