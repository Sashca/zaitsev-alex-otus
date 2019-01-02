const express = require('express');
const app = express();
const rss = require('./rss.js');
app.use('/rss', rss);
app.listen(3000);

module.exports = app;