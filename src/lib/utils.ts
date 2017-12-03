export default function getVideoTitle(fileName: string): string {
    const fileData = fileName.split('.');
    if (fileData[1] !== 'mp4') {
        throw new TypeError('File ' + fileName + ' is not a valid mp4 file.');
    }
    return fileData[0];
}
