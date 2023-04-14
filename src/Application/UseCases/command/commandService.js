const Command = require("../../../Infrastructure/Models/commandModel");

exports.addCommand = async (id, command) => {
  try {
    const newCommand= new Command(command);
    newCommand.buyer=id;
    console.log("newCommand: ", newCommand);
    const savedCommand = await newCommand.save();
    return savedCommand;
  } catch (error) {
    throw new Error(error);
  }
};
