import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";

const subscriptionUpdate = async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    throw HttpError(404);
  }
  const { email, subscription } = updatedUser;
  res.json({ email, subscription });
};

export default ctrlWrapper(subscriptionUpdate);
