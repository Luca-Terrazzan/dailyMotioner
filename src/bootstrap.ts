import * as fs from 'fs';
import Logger from './lib/logger';

const logFolder = './logs/';
const logTemplate = 'log';
const logExtension = '.log';

(() => {
    // Check if log folder is available, otherwise creates it
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder)
    }

    // might add random named logs later
    const logger = Logger.getInstance(fs.createWriteStream(logFolder + logTemplate + logExtension));
    Logger.info('Application bootstrapped!');
})();
