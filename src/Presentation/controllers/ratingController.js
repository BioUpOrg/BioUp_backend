const ratingService = require('../../Application/UseCases/rating/ratingService');
const rating = require('../../Domain/Entities/rating')

const addRating = async (req, res) => {
    try{
        const rating = req.body; // assuming user details are passed in the request body
        console.log("1",req.body);
        console.log("2",rating);
        const createdRating = await ratingService.addRating(rating);
        res.status(201).json(createdRating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
};
const getRatings = async (req, res) => {
    try{
        const ratings = await ratingService.getRatings();
        res.status(200).json(ratings);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error ratings'});
    }
}
const updateRating = async (req, res) => {
    try{
        const rating = req.body; // assuming user details are passed in the request body
        const ratingId = req.params.id;
        console.log(rating);
        const updatedRating = await ratingService.updateRating(rating,ratingId);
        res.status(200).json(updatedRating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
}
const deleteRating = async (req, res) => {
    try{
        const ratingId = req.params.id;
        const deletedRating = await ratingService.deleteRating(ratingId);
        res.status(200).json(deletedRating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
}
const getRating = async (req, res) => {
    try{
        const ratingId = req.params.id;
        const rating = await ratingService.getRating(ratingId);
        res.status(200).json(rating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
}

module.exports = {
    addRating,getRatings,updateRating,deleteRating,getRating
};

