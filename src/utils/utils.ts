import fs from 'fs';
import path from 'path';

export const pathGenerate = (dirname: string, filename: string) =>
  path.join(path.dirname(require.main!.filename), dirname, filename);

export const getProdFromFile = (cb: any) => {
  const p = pathGenerate('data', 'products.json');
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent.toString()), p);
  });
};
