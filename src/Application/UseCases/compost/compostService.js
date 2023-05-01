const Compost = require('../../../Infrastructure/Models/compostModel');

async function getAllComposts() {
  try {
    const composts = await Compost.find();
    return composts;
  } catch (error) {
    throw new Error(error);
  }
}

async function getCompostById(id) {
  try {
    const compost = await Compost.findById(id);
    return compost;
  } catch (error) {
    throw new Error(error);
  }
}

async function addCompost(compostData) {
  try {
    const newCompost = new Compost(compostData);
    const savedCompost = await newCompost.save();
    return savedCompost;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateCompost(id, compostData) {
  try {
    const updatedCompost = await Compost.findByIdAndUpdate(id, compostData, { new: true });
    return updatedCompost;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCompost(id) {
  try {
    const compost = await Compost.findByIdAndDelete(id);
    if (!compost) {
      throw new Error('Compost not found');
    }
    return compost;
  } catch (error) {
    throw new Error(error);
  }
};


async function getSellerComposts(idSeller) {
  try {
    const composts = await Compost.find({ _idSeller: idSeller });
    return composts;
  } catch (error) {
    throw new Error(error);
  }
}

async function getTopRatedComposts(limit) {
  try {
    const topComposts = await Compost
      .find()
      .sort({ rating: -1 })
      .limit(limit)
      //.populate('_idSeller', '-password')

    return topComposts;
  } catch (error) {
    throw new Error(error);
  }
};

async function getRecentlyAddedComposts(limit) {
  try {
    const composts = await Compost
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)

    return composts;
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
  getAllComposts,
  getCompostById,
  addCompost,
  updateCompost,
  deleteCompost,
  getSellerComposts,
  getTopRatedComposts,
  getRecentlyAddedComposts
};
