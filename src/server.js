import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import ContactColection from './db/models/contact.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/api/contacts', async (req, res) => {
    const data = await ContactColection.find();
    res.json({
      status: 200,
      message: ' Successfully found contacts',
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found `,
    });
  });
  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
