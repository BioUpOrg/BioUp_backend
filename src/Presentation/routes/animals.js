const express = require('express');
const router = express.Router();
const animalModel = require('../../Infrastructure/Models/animalModel');
const animalController = require('../controllers/animalController');
const vision = require('@google-cloud/vision');
const omit = require('../utils/omit');
const uploadImage = require('../utils/cloudinary/uploadImage');
const fs = require('fs');
const path = require('path');


const client = new vision.ImageAnnotatorClient({
    keyFilename: './GoogleCloudVisionApiKey.json'
});

  router.get('/getIAObjects', async (req, res) => {
        try {
            if (Object.keys(req.files || {}).length > 0) {

                const image = req.files.file[0] || req.body.file || { path: '' };
                const uploadedImage = await uploadImage(image.path);            
                 pic = uploadedImage ? uploadedImage.url : '';
                if (uploadedImage) {
                  let filePath = path.join(`${__dirname}/../../`, image.path);
                  if (filePath.includes('uploads')) {
                    fs.unlink(filePath, () => {});
                  }
                }
              }

            const [result] = await client.objectLocalization(pic);
            const objects = result.localizedObjectAnnotations.map(object => ({
           name: object.name,
            score: object.score,
            boundingPoly: object.boundingPoly
            }));
            res.json(objects);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error detecting objects');
        }
});
  



//Getting all
router.get('/', animalController.getAllAnimals);



//Getting One 

router.get('/:id', getAnimal , animalController.getOneAnimal);


//Creating Animal
router.post('/add',animalController.addAnimal);


//Updating Animal

router.patch('/:id', getAnimal, animalController.updateAnimal);



//Deleting Animal
router.delete('/:id', getAnimal ,animalController.deleteAnimal);

async function getAnimal(req, res, next) {

    let animal
    try {
        animal = await animalModel.findById(req.params.id)
        if (animal == null) {
            return res.status(404).json({ message: 'Cannot find animal' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.animal = animal
    next()

}


module.exports = router;