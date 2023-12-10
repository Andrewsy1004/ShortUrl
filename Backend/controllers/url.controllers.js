import UrlModel from "../models/MoUrl.js";

export const findUrls = async (req, res) => {
  try {
    const shortUrls = await UrlModel.find();
    await res.render("index", { shortUrls: shortUrls });
  } catch (error) {
    console.error("Error fetching short URLs:", error);
    await res.status(500).send("Internal Server Error");
  }
};

export const createUrl = async (req, res) => {
  try {
    await UrlModel.create({ originalUrl: req.body.fullUrl });
    await res.redirect("/");
  } catch (error) {
    await res.status(500).send("Internal Server Error " + error);
  }
};

export const getUrl = async (req, res) => {
  try {
    const shortUrl = await UrlModel.findOne({ shortUrl: req.params.shortUrl });
    if (!shortUrl) return res.sendStatus(404);
    await res.redirect(shortUrl.originalUrl);
  } catch (error) {
    await res.status(500).send("Internal Server Error " + error);
  }
};
