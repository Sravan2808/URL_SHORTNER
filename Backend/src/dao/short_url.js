import urlSchema from "../models/short_url.model.js";
export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
  const newUrl = new urlSchema({
    full_url: longUrl,
    short_url: shortUrl,
  });
  if (userId) {
    newUrl.user_id = userId;
  }
 await newUrl.save();
}catch (error) {
    throw new Error(error);
  
}
};

export const getShortUrl = async (shortUrl) => {
  return await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};
