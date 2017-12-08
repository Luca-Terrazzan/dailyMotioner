import * as Log from 'log';
import { WriteStream } from 'fs';

/**
 * Logger utility class, singleton
 */
export default class Logger {
    private static instance: Logger;
    private static logger: Log;
    private static debugEnabled = false;

    /**
     * Private singleton
     * @method constructor
     * @return {Logger}    singleton
     */
    private constructor(writeStream: WriteStream) {
        Logger.logger = new Log('debug', writeStream);
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

    public static toggleDebugLogging(enable?: boolean) {
        Logger.debugEnabled = enable ? enable : !Logger.debugEnabled;
    }

    public static info(...message: any[]) {
        Logger.logger.info(message);
        console.log(...message);
    }
    public static debug(...message: any[]) {
        if (Logger.debugEnabled) {
            Logger.logger.debug(message);
            console.log(...message);
        }
    }
    public static error(...message: any[]) {
        Logger.logger.error(message);
        console.log(...message);
    }
}
