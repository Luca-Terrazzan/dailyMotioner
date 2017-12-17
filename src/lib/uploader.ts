import Video from '../models/video.model';
import Logger from './logger';

import * as fs from 'fs';
import getVideoTitle from './utils';

/**
 * @class Uploader
 * @description Handles actual video uploading process, it fetches content from a folder and uploads videos
 *              in chunks. API calls are handled anonymously through passed token
 */
export default class Uploader {
    private batchSize = 1;
    private videosFolder: string;
    private token: string;

    private videos: {
        title: string,
        path: string
    }[] = [];

    /**
     * Constructs an Uploader instance
     * @param batchSize Number of videos to upload concurrently
     * @param videosFolder Path to the folder containing videos
     * @param token User token obtained through login process (any of thema re fine)
     */
    constructor(batchSize: number, videosFolder: string, token: string) {
        this.batchSize = batchSize;
        this.videosFolder = videosFolder;
        this.token = token;
    }

    /**
     * Inits the class isntance with data
     */
    public async init() {
        // Gets videos paths from the selected folder
        const files = await fs.readdirSync(this.videosFolder);
        Logger.debug('dir content: ', files);

        // For each video, get its metadata and save it into class isntance
        for (const file of files) {
            let title: string;
            try {
                title = getVideoTitle(file);
            } catch (typeError) {
                Logger.error(`Error while trying to read ${file} metadata: ${typeError.message}`);
                continue;
            }
            this.videos.push({
                title,
                path: `${this.videosFolder}/${file}`
            });
        }
    }

    /**
     * Starts the actual upload based from instance data
     * @TODO: move uploaded files to a separate directory
     */
    public async startVideoUpload() {
        // Create video instance and start upload
        // For each video, instance a model and perform the upload
        Logger.debug('Starting uploading the following videos: ', this.videos);
        for (const video of this.videos) {
            (new Video(video.title, this.token, video.path)).upload();
        }
    }
}
