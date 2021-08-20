import fs from 'fs';
import path from 'path';

export const getProdFromFile = (cb: any) => {
  const p = path.join(path.dirname(require.main!.filename), 'data', 'products.json');
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent.toString()), p);
  });
};
