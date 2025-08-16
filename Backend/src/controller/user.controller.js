import { getAllUserUrlsDao } from "../dao/user.data.js";
import catchAsync from "../utils/tryCatchWrapper.js";

export const getAllUserUrls = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const urls = await getAllUserUrlsDao(_id);
  res.status(200).json({ message:"success", urls });
});
