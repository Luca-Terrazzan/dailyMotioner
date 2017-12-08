import Logger from '../lib/logger';
import * as fs from 'fs';

export default class Config {
    private static instance: Config;

    private configJsonPath: string;
    private config: {
        username: string,
        password: string,
        logfolder: string,
        videosFolder: string,
        apiKey: string,
        apiSecret: string
    };

    // Singleton
    private constructor(configJsonPath: string) {
        if (!configJsonPath) {
            Logger.error('Please provide a valid path to the config json!');
            throw new TypeError('Please provide a valid path to the config json!');
        }
        this.configJsonPath = configJsonPath;
        this.loadConfig();
    }

    // Get singleton instance
    public static getInstance(configJsonPath: string) {
        if (!this.instance) {
            Config.instance = new Config(configJsonPath);
        }
        return this.instance;
    }

    private loadConfig() {
        this.config = JSON.parse(fs.readFileSync(this.configJsonPath, {encoding: 'UTF-8'}));
        Logger.debug('Config file read succesfully.');
    }

    public getConfigPath() {
        return this.configJsonPath;
    }

    public getConfig() {
        return this.config;
    }
}
