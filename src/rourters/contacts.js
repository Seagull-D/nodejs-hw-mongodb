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
import { addValidateContacts, updateValidateContacts } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId/:userId', isValidId, ctrlWrapper(getContactsByITController));

contactRouter.post('/', validateBody(addValidateContacts), ctrlWrapper(addContactsController));

contactRouter.put(
  '/:contactId/:userId',
  isValidId,
  validateBody(addValidateContacts),
  ctrlWrapper(upsertContactController),
);

contactRouter.patch(
  '/:contactId/:userId',
  isValidId,
  validateBody(updateValidateContacts),
  ctrlWrapper(updateContactController),
);

contactRouter.delete('/:contactId/:userId', isValidId, ctrlWrapper(deleteContactController));

export default contactRouter;
