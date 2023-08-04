import fs from "fs/promises";
import path from "path";
import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";

const avatarsPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id, avatarURL: oldAvatarURL } = req.user;
  const { path: oldPath, originalname } = req.file;
  const userAvatarName = `${_id}_${originalname}`;
  const newPath = path.join(avatarsPath, userAvatarName);
  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", userAvatarName);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    throw HttpError(404);
  }

  if (oldAvatarURL) {
    const oldAvatarPath = path.resolve("public", oldAvatarURL);
    try {
      await fs.unlink(oldAvatarPath);
    } catch {
      throw HttpError(404, "Could not delete previous avatar (Not found)");
    }
  }

  res.json({ avatarURL });
};

export default ctrlWrapper(updateAvatar);
