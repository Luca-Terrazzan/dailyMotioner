import * as WebRequest from 'web-request';
import Log from 'log';

export default class Video {

    public title: string;
    public token: string;

    public filepath: string;
    public id: string;
    public statusUrl: string;

    constructor(title: string, token: string) {
        this.title = title;
        this.token = token;
    }

    public upload(filepath: string): string {
        this.filepath = filepath;

        const uploadUrl = this.getUploadUrl();

        const videoUrl = this.uploadVideoToUploadUrl(uploadUrl);

        this.postVideo(videoUrl);

        return 'uploaded video id';
    }

    private getUploadUrl(): string {
        // ask for a upload url
        // save progress polling url for later

        return 'someurl';
    }

    private uploadVideoToUploadUrl(uploadUrl: string): string {
        // do the upload...

        return 'loaded url';
    }

    private postVideo(url: string): string {
        // post video to /me/videos

        return 'video id';
    }
}
