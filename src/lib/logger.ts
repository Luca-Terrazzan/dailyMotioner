import * as Log from 'log';
import { WriteStream } from 'fs';

/**
 * Logger utility class, singleton
 */
export default class Logger {
    private static instance: Logger;

    private static logger: Log;

    /**
     * Private singleton
     * @method constructor
     * @return {Logger}    singleton
     */
    private constructor(writeStream: WriteStream) {
        Logger.logger = new Log('info', writeStream);
    }

    /**
     * Gets the Logger instance
     * @method getInstance
     * @return {Logger}    Static singleton instance
     */
    public static getInstance(writeStream: WriteStream) {
        if (!Logger.instance) {
            Logger.instance = new Logger(writeStream);
        }
        return Logger.instance;
    }

    public static info(message: string) {
        Logger.logger.info(message);
        console.log(message);
    }
    public static debug(message: string) {
        console.log(message);
    }
    public static error(message: string) {
        console.error(message);
    }
}
