import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (req, res) => {
  const allContacts = await contactsService.listContacts();
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsService.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404, "Contact with such id was not found");
  }
  res.json(contactById);
};

const add = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await contactsService.removeContact(contactId);
  if (!removedContact) {
    throw HttpError(404, "Contact with such id was not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404, "Contact with such id was not found");
  }
  res.json(updatedContact);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
