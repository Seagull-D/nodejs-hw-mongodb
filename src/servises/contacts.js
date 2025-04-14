import ContactColection from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 1,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactColection.find();

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
  const totalItems = await ContactColection.find().countDocuments(
    contactQuery.getQuery(),
  );

  const paginationData = calcPaginationData({ page, perPage, totalItems });
  return {
    data,
    totalItems,
    ...paginationData,
  };
};

export const getContact = (contactId) =>
  ContactColection.findOne({ _id: contactId });

export const addContact = (payload) => ContactColection.create(payload);

export const upsertContact = async (contactId, payload, option = {}) => {
  const { upsert } = option;
  const rawResult = await ContactColection.findByIdAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      runValidators: true,
      upsert,
      includeResultMetadata: true,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (contactId) =>
  ContactColection.findOneAndDelete({ _id: contactId });
