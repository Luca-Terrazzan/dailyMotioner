import * as WebRequest from 'web-request';
import * as Request from 'request';
import * as fs from 'fs';

import Logger from '../lib/logger';
import Config from './config.model';

export default class Video {

    public title: string;

    public token: string;
    public filepath: string;

    public uploadUrl: string;
    public progressUrl: string;
    public url: string;
    public id: string;

    private baseUrl = 'https://api.dailymotion.com/';
    private uploadUrlEndpoint = 'file/upload/';
    private postVideoUrlEndpoint = 'me/videos/';
    private header: { Authorization: string };
    private videoMetadata: {
        channel: string,
        description: string,
        tags: string,
        publish: string
    };

    /**
     * Creates a video
     * @method constructor
     * @param  {string}    title Video's title
     * @param  {string}    token Auth token, will be moved
     * @return {Video}
     */
    constructor(title: string, token: string, filepath: string) {
        this.title = title;
        this.token = token;
        this.filepath = filepath;
        this.header = {
            Authorization: 'Bearer ' + token
        };
        this.videoMetadata = Config.getInstance().getVideosConfig();
    }

    public async upload(): Promise<string> {
        Logger.info('Uploading video: ' + this.filepath);

        await this.getUploadUrl();
        await this.uploadVideoToUploadUrl();

        return 'uploaded video id';
    }

    private async getUploadUrl(): Promise<string> {
        Logger.debug('Getting upload url');

        // ask for a upload url
        // save progress polling url for later
        const response = JSON.parse(
            (await WebRequest.get(
                this.baseUrl + this.uploadUrlEndpoint, {headers: this.header})
            ).content
        );
        this.uploadUrl = response.upload_url;
        this.progressUrl = response.progress_url;

        Logger.debug('Got upload url: ' + this.uploadUrl);
        Logger.debug('Got progress url: ' + this.progressUrl);

        return this.uploadUrl;
    }

    private uploadVideoToUploadUrl() {
        Logger.debug('Uploading video to upload url: ' + this.uploadUrl);

        // Multipart body
        const formData = {
            file: fs.createReadStream(this.filepath)
        };
        // Header and body params
        const uploadOptions = {
            url: this.uploadUrl,
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.token
            },
            formData
        };
        // Create http request
        // NOTE: Request is used here instead of WebRequest, this is due to WebRequest not handling correctly
        // multipart data body. However Request.js does *NOT* support await/async and is supposed to run on
        // vanilla javascript, hence the callback. Might be prmosified later™
        const req = Request(uploadOptions, (err, resp, body) => {
            if (err) {
                Logger.error('Error ' + err);
            } else {
                this.url = JSON.parse(body).url;
                Logger.debug('Upload successful, video url: ' + this.url);
                this.postVideo();
            }
        });
    }

    private postVideo(): boolean {
        // post video to /me/videos
        // Multipart body
        const formData = {
            title: this.title,
            channel: this.videoMetadata.channel,
            description: this.videoMetadata.description,
            tags: this.videoMetadata.tags,
            published: this.videoMetadata.publish,
            url: this.url
        };
        // Header and body params
        const uploadOptions = {
            url: this.baseUrl + this.postVideoUrlEndpoint,
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.token
            },
            formData
        };
        // Create http request
        const req = Request(uploadOptions, (err, resp, rawBody) => {
            if (err) {
                Logger.info('Error ' + err);
                return false;
            } else {
                const body = JSON.parse(rawBody);
                if (!body.id) {
                    Logger.error('Cannot post video, might be lacking manage_videos scope?', body);
                    return false;
                }
                this.id = body.id;

                Logger.debug('Video posted with: ' + body);
                Logger.info('Video posted with id: ' + this.id);

                return true;
            }
        });
        return false;
    }
}
