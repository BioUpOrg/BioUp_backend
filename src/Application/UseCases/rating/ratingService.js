const ratingRepository = require('../../../Domain/IRepositories/RatingRepository');
const addRating = async (rating) => {
    try {
        console.log("type",typeof(rating));
        return await ratingRepository.create(rating);
    } catch (err) {
        console.error(err);
        throw new Error('Could not create rating');
    }
    }
    const getRatings = async () => {
    try {
        return await ratingRepository.getAll();
    } catch (err) {
        console.error(err);
        throw new Error('Could not get ratings');
    }
    }
    const updateRating = async (rating,ratingId) => {
    try {
        return await ratingRepository.update(rating,ratingId);
    } catch (err) {
        console.error(err);
        throw new Error('Could not update rating');
    }
    }

    const deleteRating = async (ratingId) => {
    try {
        return await ratingRepository.deleteRating(ratingId);
    } catch (err) {
        console.error(err);
        throw new Error('Could not delete rating');
    }
    }
    const getRating = async (product) => {
        try {
            return await ratingRepository.getRating(product);
        } catch (err) {
            console.error(err);
            throw new Error('Could not get rating');
        }
           
    }
    module.exports = {
        addRating,getRatings,updateRating,deleteRating,getRating
    };