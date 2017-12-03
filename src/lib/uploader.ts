import Video from '../models/video.model';
import Logger from './logger';

import * as fs from 'fs';
import getVideoTitle from './utils';

export default class Uploader {
    private batchSize = 1;
    private videosFolder: string;
    private token: string;

    private videos: {
        title: string,
        path: string
    }[] = [];

    constructor(batchSize: number, videosFolder: string, token: string) {
        this.batchSize = batchSize;
        this.videosFolder = videosFolder;
        this.token = token;
    }

    public async init() {
        const files = await fs.readdirSync(this.videosFolder);
        Logger.debug('dir content: ', files);

        for (const file of files) {
            let title: string;
            try {
                title = getVideoTitle(file);
            } catch (typeError) {
                Logger.error(typeError);
                continue;
            }
            this.videos.push({
                title,
                path: this.videosFolder + file
            });
        }
    }

    public async startVideoUpload() {
        // Create video insance and start upload
        Logger.debug('Starting uploading the following videos: ', this.videos);
        for (const video of this.videos) {
            (new Video(video.title, this.token, video.path)).upload();
        }
    }
}
