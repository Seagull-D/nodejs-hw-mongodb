import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactsByITController,
  addContactsController,
} from '../controllers/contacts.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', ctrlWrapper(getContactsByITController));

contactRouter.post('/', ctrlWrapper(addContactsController));

export default contactRouter;
