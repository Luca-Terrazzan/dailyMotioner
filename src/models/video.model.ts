import * as WebRequest from 'web-request';
import Logger from '../lib/logger';

export default class Video {

    public title: string;

    public token: string;
    public filepath: string;

    public uploadUrl: string;
    public progressUrl: string;
    public id: string;

    private baseUrl = 'https://api.dailymotion.com/';
    private uploadUrlEndpoint = 'file/upload/';
    private header: {Authorization: string};

    /**
     * Creates a video
     * @method constructor
     * @param  {string}    title Video's title
     * @param  {string}    token Auth token, will be moved
     * @return {video}          Video instance
     */
    constructor(title: string, token: string, filepath: string) {
        this.title = title;
        this.token = token;
        this.filepath = filepath;
        this.header = {
            Authorization: 'Bearer ' + token
        };
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

        return this.uploadUrl;
    }

    private async uploadVideoToUploadUrl(): Promise<string> {
        // do the upload...
        Logger.debug('Uploading video to upload url: ' + this.uploadUrl);

        const response = JSON.parse(
            (await WebRequest.post(
                this.uploadUrl,
                {headers: this.header}
            )).content
        );

        Logger.debug('Uploaded file with outcome: ' + JSON.stringify(response));

        return 'loaded url';
    }

    private postVideo(url: string): string {
        // post video to /me/videos

        return 'video id';
    }
}
