import { getContacts, getContact } from '../servises/contacts.js';

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
  try {
    const data = await getContact(contactId);
    if (!data) {
      return res.status(404).json({
        message: `Contact ${contactId} not found `,
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  } catch (error) {
    console.log(error);
    throw new error();
  }
};
