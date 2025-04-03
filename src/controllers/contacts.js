import { getContacts, getContact } from '../servises/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await getContacts();
  res.json({
    status: 200,
    message: ' Successfully found contacts',
    data,
  });
};

export const getContactsByITController = async (req, res) => {
  const { contactId } = req.params;

  const data = await getContact(contactId);
  if (!data) {
    throw createHttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};
