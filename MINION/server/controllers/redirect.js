const Url = require("../models/urlModels");

const redirect = async (req, res) => {
  const browser = req.useragent.browser;
  const device = req.useragent.platform

  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      console.log("Redirecting to:", url.originUrl);
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      const existingBrowser = url.browsers.find((b) => b.name === browser);
      if (existingBrowser) {
        existingBrowser.count++;
      } else {
        url.browsers.push({ name: browser, count: 1 });
      }
      const existingDevice = url.devices.find((d) => d.name === device);
      if (existingDevice) {
        existingDevice.count++;
      } else {
        url.devices.push({ name: device, count: 1 })
      }
      await url.save();


      return res.redirect(url.originUrl);

    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
module.exports = redirect;