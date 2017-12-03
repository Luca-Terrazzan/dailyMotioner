import * as fs from 'fs';
import Logger from './lib/logger';
import Uploader from './lib/uploader';

const logFolder = './logs/';
const logTemplate = 'log';
const logExtension = '.log';
const token = 'eGdcRF1MBRVZAxxSQFZHFwIHBVUOTkpAHF4';

(async () => {
    // Check if log folder is available, otherwise creates it
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder);
    }

    // Create logger instance
    const logger = Logger.getInstance(fs.createWriteStream(logFolder + logTemplate + logExtension));
    Logger.info('Application bootstrapped!');
    Logger.toggleDebugLogging(true);

    const uploader = new Uploader(3, './videos/', token);
    await uploader.init();
    await uploader.startVideoUpload();
})();
