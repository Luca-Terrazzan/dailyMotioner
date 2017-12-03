import * as fs from 'fs';
import Logger from './lib/logger';
import Uploader from './lib/uploader';
import DailyMotion from './lib/dailymotion';

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

    // Start upload
    // const uploader = new Uploader(3, './videos/', token);
    // await uploader.init();
    // await uploader.startVideoUpload();

    // Create DailyMotion app
    const dailyMotion = new DailyMotion(
        'luca.terraz@gmail.com',
        'QWE123qw!',
        '6db8c2ed9a6ef7630b47',
        '4b48fa27f4946b726a16b6efb6b245e1a7c9b4b6'
    );
    await dailyMotion.login();
})();
