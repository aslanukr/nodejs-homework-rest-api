import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../decorators/index.js";

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

export default ctrlWrapper(add);
