import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactsByITController,
  addContactsController,
  upsertContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', ctrlWrapper(getContactsByITController));

contactRouter.post('/', ctrlWrapper(addContactsController));

contactRouter.put('/:contactId', ctrlWrapper(upsertContactController));

contactRouter.patch('/:contactId', ctrlWrapper(updateContactController));

contactRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactRouter;
