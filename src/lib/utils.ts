export default function getVideoTitle(fileName: string): string {
    const fileData = fileName.split('.');
    if (fileData.pop() !== 'mp4') {
        throw new TypeError('File ' + fileName + ' is not a valid mp4 file.');
    }
    return fileData.join('.');
}
