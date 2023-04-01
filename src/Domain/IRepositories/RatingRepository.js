const Rating = require('../Entities/rating');
const ratingModel = require('../../Infrastructure/Models/ratingModel');
const create = async (ratingData) => {
    try {
      const rating = new Rating(ratingData);
      console.log("ratingData",ratingData)
        const createdRating = await ratingModel.create(rating);
        return createdRating.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not create rating');
    }
}
const getAll = async () => {
    try {
        const ratings = await ratingModel.find();
        return ratings.map((rating) => rating.toObject());
    } catch (err) {
        console.error(err);
        throw new Error('Could not get ratings');
    }
}
const getRating = async (ratingId) => {
    try {
        const ratring = await ratingModel.findById(ratingId);
        return ratring.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not get rating');
    }
}
const update = async (ratingData,ratingId) => {
    try {
        const rating = new Rating(ratingData);
        const updatedRating = await ratingModel.findByIdAndUpdate(ratingId,rating);
        return updatedRating.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not update rating');
    }
}
const deleteRating = async (ratingId) => {
    try {
        const deletedRating = await ratingModel.findByIdAndDelete(ratingId);
        return deletedRating.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not delete rating');
    }
}

module.exports = {
 create,getAll,update,deleteRating,getRating
};
