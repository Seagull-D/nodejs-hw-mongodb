import ContactColection from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({ page = 1, perPage = 1 }) => {
  const skip = (page - 1) * perPage;
  const data = await ContactColection.find().skip(skip).limit(perPage);
  const totalItems = await ContactColection.find().countDocuments();
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
