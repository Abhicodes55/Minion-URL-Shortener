const Url = require("../models/urlModels");

const deleteShortUrl = async (req, res) => {
  const { id } = req.params;
  console.log(id, 'id')
  try {
    const url = await Url.findByIdAndDelete(id);
    res.send(url); console.log('deleted')
  }
  catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
module.exports = deleteShortUrl