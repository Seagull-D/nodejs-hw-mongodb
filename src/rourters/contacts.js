import { Router } from 'express';
import {
  getContactsController,
  getContactsByITController,
} from '../controllers/contacts.js';

const contactRouter = Router();

contactRouter.get('/', getContactsController);

contactRouter.get('/:contactId', getContactsByITController);

export default contactRouter;
