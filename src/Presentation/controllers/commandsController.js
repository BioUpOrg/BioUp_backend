const commandService = require("../../Application/UseCases/command/commandService");

exports.addCommand = async (req, res) => {
  try {
    console.log("req.user._id: ", req.user._id);
    const command = await commandService.addCommand(req.user._id, req.body);
    res.status(201).json(command);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


