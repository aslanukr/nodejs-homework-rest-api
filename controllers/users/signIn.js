import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = "asdase5.454w4dqw65d4aw5";

  res.json({ token });
};

export default ctrlWrapper(signIn);
