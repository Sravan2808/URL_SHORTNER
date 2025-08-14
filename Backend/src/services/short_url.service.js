import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";
import { AppError } from "../utils/errorHandler.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = await generateNanoId(7);
  if(!shortUrl) throw new AppError("Failed to generate short URL", 500);
  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const createShortUrlWithUser = async (url, userId,slug=null) => {
  const shortUrl = slug || await generateNanoId(7);
  const exists = await getCustomShortUrl(slug)
  if(exists) throw new AppError("Slug already exists", 400);
  
  await saveShortUrl(shortUrl,url , userId);
  return shortUrl;
};
