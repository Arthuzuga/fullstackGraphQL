import * as fs from 'fs';
import * as path from 'path';

const staticPath = "../audios";

export async function writeFile(filename, data) {
    await fs.writeFile(filename, data);
}

export async function uploadFile(filename, data) {
    await writeFile(staticPath + '/' + filename, data);
    return `http://${path.join(__dirname + '/') + filename}`
}