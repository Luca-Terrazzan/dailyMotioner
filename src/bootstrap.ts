import * as fs from 'fs';
import Logger from './lib/logger';
import Video from './models/video.model';

const logFolder = './logs/';
const logTemplate = 'log';
const logExtension = '.log';

(() => {
    // Check if log folder is available, otherwise creates it
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder)
    }

    // Create logger instance
    const logger = Logger.getInstance(fs.createWriteStream(logFolder + logTemplate + logExtension));
    Logger.info('Application bootstrapped!');

    // Start the upload of test video
    const video = new Video('Test video 1', 'a3UEAhFND1QKBBhZXQhBQ1UBGBdKEh0TQUo');
    video.upload('../videos/test.mp4');
})();
