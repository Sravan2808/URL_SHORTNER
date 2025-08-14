import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js";
import catchAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = catchAsync(async (req, res, next) => {
  const data = req.body;
  let shortUrl
  if (req.user) {
     shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug);
  } else {
     shortUrl = await createShortUrlWithoutUser(data.url);
  }
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectFromShortUrl = catchAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  res.redirect(url.full_url);
});

export const createCustomShortUrl = catchAsync(async (req, res, next) => {
  const { url, slug } = req.body;
  if (req.user) {
    const shortUrl = await createShortUrlWithUser(url, customUrl);
  } else {
    const shortUrl = await createShortUrlWithoutUser(url, customUrl);
  }
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
