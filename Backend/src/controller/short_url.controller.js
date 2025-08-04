import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser } from "../services/short_url.service.js";
import catchAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = catchAsync(async (req, res, next) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url);
  res.status(200).json({shortUrl:process.env.APP_URL + shortUrl});
});

export const redirectFromShortUrl = catchAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  res.redirect(url.full_url);
});
