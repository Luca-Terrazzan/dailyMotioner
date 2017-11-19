import * as WebRequest from 'web-request';

(async () => {
    const result = await WebRequest.get('http://www.google.com/');
    console.log(result.content);
})();
