import express from "express";
import contacts from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  res.json(contactById);
});

router.post("/", async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);

  res.json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await contacts.removeContact(contactId);
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router;
