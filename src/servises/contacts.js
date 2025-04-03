import ContactColection from '../db/models/contact.js';

export const getContacts = () => ContactColection.find();

export const getContact = (contactId) =>
  ContactColection.findOne({ _id: contactId });

export const addContact = (payload) => ContactColection.create(payload);
