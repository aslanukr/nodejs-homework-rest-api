import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

const { BASE_URL } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatar = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<h1>Welcome to Phonebook</h1><a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default ctrlWrapper(signUp);
