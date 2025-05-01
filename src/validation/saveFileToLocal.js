import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOAD_FILE_DIR } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const saveFileToloacal = async (file) => {
  const newPash = path.join(UPLOAD_FILE_DIR, file.filename);
  await fs.rename(file.path, newPash);
  return `${getEnvVar('APP_DOMAIN_FOR_UPLOAD')}/upload/${file.filename}`;
};
