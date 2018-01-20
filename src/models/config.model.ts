import Logger from '../lib/logger';
import * as fs from 'fs';

/**
 * Utility class containing all app's settings. Singleton to statically serve all settings within the applciation.
 *
 * @export
 * @class Config
 */
export default class Config {
    private static instance: Config;

    private userConfig: {
        username: string,
        password: string,
        apiKey: string,
        apiSecret: string
    };
    private folderConfig: {
        logfolder: string,
        videosFolder: string,
    };
    private videosConfig: {
        channel: string,
        description: string,
        tags: string,
        publish: string
    };
    private options: {
        debug: boolean
    };

    // Singleton
    private constructor() {}

    // Get singleton instance
    public static getInstance() {
        if (!this.instance) {
            Config.instance = new Config();
        }
        return this.instance;
    }

    /**
     * Loads configuration file
     *
     * @param {string} configJsonPath The path to config.json
     * @returns {Config} Chain pattern
     * @memberof Config
     */
    public loadConfig(configJsonPath: string) {
        if (!configJsonPath) {
            Logger.error('Please provide a valid path to the config json!');
            throw new TypeError('Please provide a valid path to the config json!');
        }
        try {
            const config = JSON.parse(fs.readFileSync(configJsonPath, {encoding: 'UTF-8'}));
            this.userConfig = config.userInfo;
            this.folderConfig = config.folders;
            this.videosConfig = config.videosMetadata;
            this.options = config.options;
        } catch (error) {
            Logger.error('Error while parsing config file!', error);
            throw new TypeError('Error while parsing config file!');
        }
        Logger.debug('Config file read succesfully.');
        return this;
    }

    public getUserConfig() {
        return this.userConfig;
    }

    public getFolderConfig() {
        return this.folderConfig;
    }

    public getVideosConfig() {
        return this.videosConfig;
    }

    public getOptions() {
        return this.options;
    }
}
