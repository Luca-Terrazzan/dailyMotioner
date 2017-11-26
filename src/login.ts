import * as WebRequest from 'web-request';

const token = 'Y3cCAhwAGlheCgdXU1AZFAUBBgoFFllfCwI';

(async () => {
    const url: string = 'https://api.dailymotion.com/user/me/likes?access_token=ODRaDBseAlRYQgdQXV5FHUdEEh0eUglZD00';
    const header: object = {

    };
    const param: object = {
        access_token: token
    };

    const result = await WebRequest.get(url);

    console.log(result.content);
})();
