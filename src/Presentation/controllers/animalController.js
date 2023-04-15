const Animal = require('../../Infrastructure/Models/animalModel');




const getAllAnimals = async (req, res) => {

    try{
        const animals=await Animal.find()
        res.status(200).json(animals)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}



const addAnimal= async (req, res) => {
    console.log(req.body)
    const animal = new Animal({
        name : req.body.name,
        image : req.body.image,
        sex: req.body.sex,
        birthdate: req.body.birthdate,
        age: req.body.age,
        healthStatus: req.body.healthStatus,
        vaccinations: req.body.vaccinations,
        feedingSchedule: req.body.feedingSchedule,
        price: req.body.price,
        quantity: req.body.quantity,
        user: req.body.user,
        Farm: req.body.Farm
    });
    try {


        const newAnimal = await animal.save()
        res.status(201).json(newAnimal)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}




const updateAnimal=async (req, res) => {
    if(req.body.name!=null){
        res.animal.name=req.body.name
    }
    if(req.body.image!=null){
        res.animal.image=req.body.image
    }
    if(req.body.sex!=null){
        res.animal.sex=req.body.sex
    }
    if(req.body.birthdate!=null){
        res.animal.birthdate=req.body.birthdate
    }
    if(req.body.age!=null){
        res.animal.age=req.body.age
    }
    if(req.body.healthStatus!=null){
        res.animal.healthStatus=req.body.healthStatus
    }
    if(req.body.vaccinations!=null){
        res.animal.vaccinations=req.body.vaccinations
    }
    if(req.body.feedingSchedule!=null){
        res.animal.feedingSchedule=req.body.feedingSchedule
    }
    if(req.body.price!=null){
        res.animal.price=req.body.price
    }
    if(req.body.quantity!=null){
        res.animal.quantity=req.body.quantity
    }

    if(req.body.Farm!=null){
        res.animal.Farm=req.body.Farm
    }

  
    try {
        const updatedAnimal = await res.animal.save()
        res.json(updatedAnimal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const deleteAnimal=async (req, res) => {
    
    try {
        await res.animal.remove()
        res.json({ message: 'Deleted Animal' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const getOneAnimal = (req, res) => {
    res.json(res.animal)
}





module.exports = {
    getAllAnimals,addAnimal,updateAnimal,deleteAnimal,getOneAnimal
}