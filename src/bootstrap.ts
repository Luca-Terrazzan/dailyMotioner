import * as fs from 'fs';
import Logger from './lib/logger';
import Uploader from './lib/uploader';
import DailyMotion from './lib/dailymotion';
import Config from './models/config.model';

const logFolder = './logs/';
const logTemplate = 'log';
const logExtension = '.log';

(async () => {
    // Check if log folder is available, otherwise creates it
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder);
    }

    // Create logger instance
    const logger = Logger.getInstance(fs.createWriteStream(
        logFolder + logTemplate + logExtension,
        { flags: 'a' } // Append
    ));
    Logger.info('Application bootstrapped!');
    Logger.toggleDebugLogging(true);

    const config = Config.getInstance('./config.json').getConfig();

    Logger.debug(config);

    // Create DailyMotion app
    const dailyMotion = new DailyMotion(
        config.username,
        config.password,
        config.apiKey,
        config.apiSecret
    );
    await dailyMotion.login();
    await dailyMotion.uploadVideos(config.videosFolder);
})();
