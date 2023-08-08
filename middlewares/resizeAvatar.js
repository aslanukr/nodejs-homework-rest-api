import Jimp from "jimp";
import { HttpError } from "../helpers/index.js";

const resizeAvatar = async (req, res, next) => {
  const { path } = req.file;

  if (!path) {
    throw HttpError(401);
  }

  try {
    const img = await Jimp.read(path);
    await img.resize(250, 250).write(path);
    next();
  } catch (err) {
    next(err);
  }
};

export default resizeAvatar;
