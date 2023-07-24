import Contact from "../../models/contact.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const getAll = async (req, res) => {
  const allContacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(allContacts);
};

export default ctrlWrapper(getAll);
