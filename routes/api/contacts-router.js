import express from "express";
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateFavoriteStatus,
} from "../../controllers/contacts/index.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:contactId", isValidId, getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  addContact
);

contactsRouter.delete("/:contactId", isValidId, deleteContactById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  updateContactById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  updateFavoriteStatus
);

export default contactsRouter;
