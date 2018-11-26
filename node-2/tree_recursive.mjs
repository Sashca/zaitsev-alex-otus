const fs = require('fs');

module.exports = readdirWrapped;

function isDirectoryOrFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (error, info) => {
            if (error) reject(error)
            
            if (info.isDirectory()) {
                return readdirWrapped(filePath + '/', this.array).then((result)=>{
                    result.folders.push (filePath);
                    resolve(result);
                });
            } else if (info.isFile()) {
                resolve(1);
            }
            resolve(this.array);
        });
    });
}

function readdirWrapped(filePath, result) {
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (error, items) => {
            if (error) reject(error);
            let fullArrayPath = items.map((item) =>  filePath + item);
            Promise.all(fullArrayPath.map(isDirectoryOrFile, {array:result})).then((results) => {
                results.forEach((item, index) => {
                    if (item === 1) result.files.push(fullArrayPath[index]);
                });
                resolve(result);
            });
        });
    });
}