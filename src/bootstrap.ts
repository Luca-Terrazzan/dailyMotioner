import * as fs from 'fs';
import Logger from './lib/logger';
import Uploader from './lib/uploader';
import DailyMotion from './lib/dailymotion';
import Config from './models/config.model';

const logFolder = './logs/';
const logTemplate = 'log';
const logExtension = '.log';
const configPath = '../config.json';

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

    // Load application configuration
    const config = Config.getInstance().loadConfig(configPath);

    const userConfig = config.getUserConfig();
    const folderConfig = config.getFolderConfig();

    // Create DailyMotion app
    const dailyMotion = new DailyMotion(
        userConfig.username,
        userConfig.password,
        userConfig.apiKey,
        userConfig.apiSecret
    );
    await dailyMotion.login();
    await dailyMotion.uploadVideos(folderConfig.videosFolder);
})();
