const Url = require("../models/urlModels");

const getById = async (req, res) => {
    const {id} = req.params
    try {
        const url = await Url.findById(id);
        res.send(url); 
        console.log(url)
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
}
module.exports = getById;