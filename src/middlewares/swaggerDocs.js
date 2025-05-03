import { SWAGGER_PATH } from '../constants/index.js';
import { readFileSync } from 'node:fs';
import swaggerUI from 'swagger-ui-express';

export const swaggerDocs = () => {
  try {
    const swaggerDocs = JSON.parse(readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDocs)];
  } catch {
    return (req, res) => {
      res.status(500).json({
        message: 'Cant load swagger docs',
      });
    };
  }
};
