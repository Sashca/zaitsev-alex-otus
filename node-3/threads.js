
var Readable = require('stream').Readable;
var Transform = require('stream').Transform;
var Writable = require('stream').Writable;

var rs = new Readable({objectMode: true, highWaterMark:1});
var ts = new Transform({objectMode: true, highWaterMark:1});
var ws = new Writable({objectMode: true, highWaterMark:1});

rs._read = function() {
    var newDigit = Math.floor(Math.random() * 1000);
    rs.push(newDigit);
}

ts._transform = function(chunk, encoding, done) {
    var modDigit = Math.floor(Math.random() * 1000);
    chunk = chunk + modDigit;
    this.push(chunk);
    done();
}

ws._write = function(chunk, encoding, done) {
    console.log(chunk);
    done();
}

rs.pipe(ts).pipe(ws);
