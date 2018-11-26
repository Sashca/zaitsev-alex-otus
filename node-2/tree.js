const fs = require('fs');
let pathFolder;
const readdirWrapped = require("./tree_recursive.mjs");

if (process.argv.length === 3) {
    pathFolder = process.argv[2];
} else {
    pathFolder = __dirname + '/';
}

fs.stat(pathFolder, (error, info) => {
    if (!error) {
        if (info.isDirectory()) {
            let res = {files: [], folders: []}
            readdirWrapped(pathFolder, res).then((result) => {
                console.log("json");
                console.log(result);
            });
        } else {
            console.log (pathFolder + " - is not a directory")
        }
    } else {
        console.log ("Error run fs.stat - path: " + pathFolder);
    }
});


