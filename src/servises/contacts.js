import ContactColection from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({ page = 1, perPage = 1, sortBy, sortOrder = sortList[0], filters = {} }) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactColection.find();
  if (filters.userId) {
    contactQuery.where('userId').equals(filters.userId);
  }
  if (filters.contactType) {
    contactQuery.where('contactType').equals(filters.contactType);
  }
  if (typeof filters.isFavourite === 'boolean') {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }
  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactColection.find().countDocuments(contactQuery.getQuery());

  const paginationData = calcPaginationData({ page, perPage, totalItems });
  return {
    data,
    totalItems,
    ...paginationData,
  };
};

export const getContact = async (contactId, userId) => ContactColection.findOne({ _id: contactId, userId });

export const addContact = async (payload) => ContactColection.create(payload);

export const upsertContact = async (contactId, userId, payload, option = {}) => {
  const { upsert } = option;
  const rawResult = await ContactColection.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
    runValidators: true,
    upsert,
    includeResultMetadata: true,
  });
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = async (contactId, userId) =>
  ContactColection.findOneAndDelete({ _id: contactId, userId });
