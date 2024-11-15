import fs from "fs";

interface File {
  type: "file" | "dir";
  name: string;
  path: string;
}

export const fetchDir = (dir: string, baseDir: string): Promise<File[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          files.map((file) => ({
            type: file.isDirectory() ? "dir" : "file",
            name: file.name,
            path: `${baseDir}/${file.name}`,
          }))
        );
      }
    });
  });
};

export const fetchFileContent = (fullpath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(fullpath, "utf-8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export const saveFile = (file: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, "utf-8", (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
