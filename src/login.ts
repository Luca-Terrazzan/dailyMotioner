import * as WebRequest from 'web-request';
import Video from './models/video.model';

const token = 'cHdZXQEQUE5GV1hLX1ZHQAkJCk4ORAcJWwE';

(async () => {
    const video = new Video('test', token, '../videos/test.mp4');
    video.upload();

    const url = 'https://api.dailymotion.com/file/upload';
    const header: object = {
        Authorization: 'Bearer ' + token
    };
    const param: object = {
        access_token: token
    };
    const body: object = {
        file: '../videos/test.mp4'
    };

    const result = await WebRequest.get(url, {headers: header});

    console.log(result.content);
})();
