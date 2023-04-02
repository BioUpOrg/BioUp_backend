const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    sex: { type: String, required: true },
    birthdate: { type: Date },
    age: { type: Number },
    healthStatus: { type: String },
    vaccinations: { type: [String] },
    feedingSchedule: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number },
    Farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' }

});






const animalModel = mongoose.model('Animal', animalSchema);
module.exports = animalModel;