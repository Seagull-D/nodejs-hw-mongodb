import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloud } from './saveFileToCloud.js';
import { saveFileToloacal } from './saveFileToLocal.js';

export const saveFile = async (file) => {
  const strategy = getEnvVar('SAVE_FILE_STRATEGY');
  console.log(strategy);
  switch (strategy) {
    case 'cloudinary':
      return await saveFileToCloud(file);

    case 'local':
      return await saveFileToloacal(file);
    default:
      throw new Error(500, `Unknown SAVE_FILE_STRATEGY: ${strategy}`);
  }
};
