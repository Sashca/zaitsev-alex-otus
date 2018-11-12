let fetch = require('node-fetch');
var argv = require("optimist").argv;
var n    = 1;
var type = "p";

if (argv.n !== undefined) {
    if (argv.n > 0) n = argv.n;
}

if (argv.t !== undefined) {
    if (argv.t === "p" || argv.t === "s") type = argv.t;
}

var requests = new Array(n);
requests.fill("http://localhost:3000");

if (type === "p") {
    Promise.all(requests.map(fetch)).then(responses => {
        console.log("finish requests");
    });
} else {
    requests.reduce(function (item, value) {
        return item.then(() => {
            return fetch(value).then(response => {
                console.log("finish request");
            });
        })
    }, Promise.resolve());
}





