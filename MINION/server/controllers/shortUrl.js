const { nanoid } = require("nanoid");
const Url = require("../models/urlModels");
const NodeCache = require("node-cache");
const rateLimit = require("express-rate-limit");

// Created a new cache instance with a TTL (time-to-live) of 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

// Rate limit middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 3 requests per hour
  message: "Rate limit exceeded",
});

const generateUrl = async (req, res) => {
  const { originUrl } = req.body;
  const base = process.env.BASE;

  // Check if the URL is already in the cache
  const cachedUrl = cache.get(originUrl);
  if (cachedUrl) {
    return res.json(cachedUrl);
  }

  const urlId = nanoid();

  try {
    let url = await Url.findOne({ originUrl });
    if (url) {
      // Cache the URL
      cache.set(originUrl, url);
      res.json(url);
    } else {
      const shortUrl = `${base}/${urlId}`;
      url = new Url({
        originUrl,
        shortUrl,
        urlId,
        date: new Date(),
      });
      await url.save();
      // Cache the newly created URL
      cache.set(originUrl, url);
      res.json(url);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

module.exports = { generateUrl, limiter };
