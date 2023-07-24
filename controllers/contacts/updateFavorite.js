import Contact from "../../models/contact.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { HttpError } from "../../helpers/index.js";

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Contact with such id was not found");
  }
  res.json(updatedContact);
};

export default ctrlWrapper(updateFavorite);
