import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import gravatar from "gravatar";

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatar = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatar,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default ctrlWrapper(signUp);
