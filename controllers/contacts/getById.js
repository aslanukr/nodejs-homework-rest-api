import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw HttpError(404, "Contact with such id was not found");
  }
  res.json(contactById);
};

export default ctrlWrapper(getById);
