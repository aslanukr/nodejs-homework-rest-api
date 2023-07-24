import Contact from "../../models/contact.js";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw HttpError(404, "Contact with such id was not found");
  }
  res.json({ message: "Contact deleted" });
};

export default ctrlWrapper(deleteById);
