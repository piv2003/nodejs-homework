const Contact = require("../model/contactModel");

const listContacts = async (userId, query) => {};
const getContactById = async (contactId, userId) => {};

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};
export default {
  Contact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
