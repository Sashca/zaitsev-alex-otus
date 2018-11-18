var fs = require('fs');
var pathFolder;
var arrayFolder = [];
var arrayFiles = [];

if (process.argv.length === 3) {
    pathFolder = process.argv[2];
} else {
    pathFolder = __dirname + '/';
}

function isDirectoryOrFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (error, info) => {
            if (error) reject(error)
            if (info.isDirectory()) {
                arrayFolder.push(filePath);
                return readdirWrapped(filePath + '/').then(()=>{
                    resolve();
                });
            }
            else if (info.isFile()) {
                arrayFiles.push(filePath);
            }
            resolve();
        });
    });
}

function readdirWrapped(filePath) {
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (error, items) => {
            if (error) reject(error);
            let fullArrayPath = [];
            items.forEach((item) => {
                fullArrayPath.push(filePath + item);
            });
            Promise.all(fullArrayPath.map(isDirectoryOrFile)).then(() => {
                resolve();
            });
        });
    });
}

fs.stat(pathFolder, (error, info) => {
    if (!error) {
        if (info.isDirectory()) {
            readdirWrapped(pathFolder).then(() => {
                var result = new Object();
                result["files"] = arrayFiles;
                result["dirs"] = arrayFolder;
                console.log("json");
                console.log(result);
            });
        } else {
            console.log(pathFolder + " - is not a directory")
        }
    }
});
