import Axios from 'axios';
import Logger from '../lib/logger';
import { stringify } from 'querystring';
import Uploader from './uploader';

export default class DailyMotion {
    private username: string;
    private password: string;
    private apiKey: string;
    private apiSecret: string;

    private baseUrl = 'https://api.dailymotion.com/';
    private loginEndpoint = 'oauth/token';

    private accessToken: string;
    private refreshToken: string;

    constructor(username: string, password: string, apiKey: string, apiSecret: string) {
        this.username = username;
        this.password = password;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public async login(): Promise<boolean> {
        const loginBody = {
            grant_type: 'password',
            client_id: this.apiKey,
            client_secret: this.apiSecret,
            username: this.username,
            password: this.password,
            scope: 'manage_videos manage_playlists'
        };
        const response = await Axios.post(
            this.baseUrl + this.loginEndpoint,
            stringify(loginBody)
        );

        if (response.data.access_token) {
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;

            Logger.debug('Login successful! access token: ', this.accessToken);
            return true;
        } else {
            Logger.error('Login failed with response: ', response.data);
            return false;
        }
    }

    public async uploadVideos(pathToVideosFolder: string, batchSize?: number): Promise<boolean> {
        const uploader = new Uploader(batchSize ? batchSize : 1, pathToVideosFolder, this.accessToken);
        await uploader.init();
        await uploader.startVideoUpload();

        return true;
    }
}
