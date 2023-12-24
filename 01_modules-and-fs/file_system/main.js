const fs = require('fs').promises;
const path = require('path');

/**
 * IIFE
 */
(async () => {
  try {
    // READ text file from FS ===============
    // WINDOWS C:\\Desktop\project\text.txt
    // UNIX-LIKE /home/src/text.txt

    const pathToFile = path.join('files', 'books', 'manual.txt');
    // const path2 = path.resolve('files/books/manual.txt');

    const readResult = await fs.readFile(pathToFile);

    const txt = readResult.toString();
    const filesDir = 'files';

    const listDirContent = await fs.readdir(filesDir);
    const stat = await fs.lstat(filesDir);

    console.log(stat.isDirectory());

    // await fs.appendFile(pathToFile, 'NEW LINE!!!!!');

    // READ JSON =========================
    const pathToJson = path.join('files', 'example.json');

    const jsonReadRes = await fs.readFile(pathToJson);

    const json = JSON.parse(jsonReadRes);

    json.job = 'Rock musician';

    await fs.writeFile('newJosn.json', JSON.stringify(json));
  } catch (err) {
    console.log(err);
  }
})();
