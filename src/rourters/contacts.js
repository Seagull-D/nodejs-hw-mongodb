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
import { validateBody } from '../utils/validateBody.js';
import {
  addValidateContacts,
  updateValidateContacts,
} from '../validation/contacts.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', ctrlWrapper(getContactsByITController));

contactRouter.post(
  '/',
  validateBody(addValidateContacts),
  ctrlWrapper(addContactsController),
);

contactRouter.put(
  '/:contactId',
  validateBody(addValidateContacts),
  ctrlWrapper(upsertContactController),
);

contactRouter.patch(
  '/:contactId',
  validateBody(updateValidateContacts),
  ctrlWrapper(updateContactController),
);

contactRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactRouter;
