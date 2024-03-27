const express = require("express");
const router = express.Router();
const { generateUrl, limiter } = require("../controllers/shortUrl");
const redirect = require("../controllers/redirect");
const deleteShortUrl = require("../controllers/deleteUrl");
const getAllUrls = require("../controllers/getAllUrls");
const getById = require("../controllers/getById");

router.post("/shorturl",limiter, generateUrl);
router.get('/allurls', getAllUrls);
router.get("/getData/:id", getById);
router.get("/:urlId", redirect);
router.delete("/deleteurl/:id", deleteShortUrl);

module.exports = router;