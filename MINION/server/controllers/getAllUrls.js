const Url = require("../models/urlModels");

const getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find();
        res.json(urls)
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
}
module.exports = getAllUrls;