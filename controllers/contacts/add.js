import Contact from "../../models/contact.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

export default ctrlWrapper(add);
