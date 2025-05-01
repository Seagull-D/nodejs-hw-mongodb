import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactRouter from './rourters/contacts.js';
import authRouter from './rourters/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_FILE_DIR } from './constants/index.js';
export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );
  app.use('/upload', express.static(UPLOAD_FILE_DIR));
  app.use('/auth', authRouter);
  app.use('/contacts', contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
