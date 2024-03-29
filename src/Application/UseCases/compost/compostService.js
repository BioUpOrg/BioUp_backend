const Compost = require("../../../Infrastructure/Models/compostModel");
const Command = require("../../../Infrastructure/Models/commandModel");

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
    const updatedCompost = await Compost.findByIdAndUpdate(id, compostData, {
      new: true,
    });
    return updatedCompost;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCompost(id) {
  try {
    const compost = await Compost.findByIdAndDelete(id);
    if (!compost) {
      throw new Error("Compost not found");
    }
    return compost;
  } catch (error) {
    throw new Error(error);
  }
}

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
    const topComposts = await Compost.find().sort({ rating: -1 }).limit(limit);
    //.populate('_idSeller', '-password')

    return topComposts;
  } catch (error) {
    throw new Error(error);
  }
}

async function getRecentlyAddedComposts(limit) {
  try {
    const composts = await Compost.find().sort({ createdAt: -1 }).limit(limit);

    return composts;
  } catch (error) {
    throw new Error(error);
  }
}

async function getTopSelledComposts(limit) {
  try {
    const topComposts = await Command.aggregate([
      { $unwind: "$products" },
      { $match: { "products.type": "compost" } },
      {
        $group: {
          _id: "$products.product",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "composts",
          localField: "_id",
          foreignField: "_id",
          as: "compost",
        },
      },
      { $unwind: "$compost" },
      {
        $project: {
          _id: "$compost._id",
          name: "$compost.name",
          unitPrice: "$compost.unitPrice",
          discountOffered: "$compost.discountOffered",
          quantityWeight: "$compost.quantityWeight",
          rating: "$compost.rating",
          description: "$compost.description",
          image: "$compost.image",
          totalQuantity: 1,
        },
      },
    ]);
    return topComposts;
  } catch (error) {
    throw new Error(error);
  }
}

// async function getRecommendedComposts(soilType) {
//   try {
//     // Retrieve all composts from the database
//     const allComposts = await Compost.find({});

//     // Define the list of nutrients for each soil type
//     const soilNutrients = {
//       'Black_Soil': ['Nitrogen', 'Phosphorus', 'Potassium', 'Magnesium', 'Sulfur', 'Molybdenum'],
//       'Cinder_Soil': ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'Sulfur'],
//       'Laterite_Soil': ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'Sulfur', 'Boron', 'Iron', 'Manganese', 'Zinc'],
//       'Peat_Soil': ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'Sulfur', 'Boron', 'Iron', 'Manganese', 'Zinc'],
//       'Yellow_Soil': ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'Sulfur', 'Boron', 'Iron', 'Manganese', 'Zinc']
//     };

//     // Find the list of missing nutrients for the given soil type
//     const missingNutrients = soilNutrients[soilType];

//     // Filter the composts that contain all the missing nutrients
//     const recommendedComposts = allComposts.filter(compost => {
//       const compostNutrients = compost.nutrientContent[0].split(",");
//       console.log("compostNutrients: ", compostNutrients);
//       const missingNutrientsLowerCase = missingNutrients.map(nutrient => nutrient.toLowerCase());
//       console.log("missingNutrientsLowerCase: ", missingNutrientsLowerCase);
//       return missingNutrientsLowerCase.every(nutrient => {
//         compostNutrients.includes(nutrient)
//         console.log(nutrient);
//       });
//     });

//     return recommendedComposts;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

async function getRecommendedComposts(soilType) {
  try {
    // Retrieve all composts from the database
    const allComposts = await Compost.find({});

    // Define the list of nutrients for each soil type
    const soilNutrients = {
      Black_Soil: [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Magnesium",
        "Sulfur",
        "Molybdenum",
      ],
      Cinder_Soil: [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Calcium",
        "Magnesium",
        "Sulfur",
      ],
      Laterite_Soil: [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Calcium",
        "Magnesium",
        "Sulfur",
        "Boron",
        "Iron",
        "Manganese",
        "Zinc",
      ],
      Peat_Soil: [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Calcium",
        "Magnesium",
        "Sulfur",
        "Boron",
        "Iron",
        "Manganese",
        "Zinc",
      ],
      Yellow_Soil: [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Calcium",
        "Magnesium",
        "Sulfur",
        "Boron",
        "Iron",
        "Manganese",
        "Zinc",
      ],
    };

    // Find the list of missing nutrients for the given soil type
    const missingNutrients = soilNutrients[soilType];

    // Filter the composts that contain all the missing nutrients
    const recommendedComposts = allComposts.filter((compost) => {
      const compostNutrients = compost.nutrientContent[0].split(",");
      const missingNutrientsLowerCase = missingNutrients.map((nutrient) =>
        nutrient.toLowerCase()
      );
      return compostNutrients.some((nutrient) =>
        missingNutrientsLowerCase.includes(nutrient.trim().toLowerCase())
      );
    });

    return recommendedComposts;
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
  getRecentlyAddedComposts,
  getTopSelledComposts,
  getRecommendedComposts,
};
