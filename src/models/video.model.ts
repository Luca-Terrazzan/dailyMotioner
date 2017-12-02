import * as WebRequest from 'web-request';

export class Video {
    public upload(filepath: string, token: string): string {
        return 'uploaded video id';
    }

    private getUploadUrl(): string {
        return 'someurl';
    }

    private uploadVideoToUploadUrl(): boolean {
        return false;
    }
}
