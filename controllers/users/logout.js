import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorators/index.js";

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "Logout successful",
  });
};

export default ctrlWrapper(logout);
