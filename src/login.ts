import * as WebRequest from 'web-request';

const token = 'Y3cCAhwAGlheCgdXU1AZFAUBBgoFFllfCwI';

(async () => {
    const result = await WebRequest.get('https://api.dailymotion.com/videos');
    console.log(result.content);
})();
