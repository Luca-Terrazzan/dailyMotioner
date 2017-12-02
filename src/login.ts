import * as WebRequest from 'web-request';

const token = 'YmQIAgIVAUsHAh9TB1FUEkpdEx9BW18PDls';

(async () => {
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
