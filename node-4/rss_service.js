var express = require('express');
const app = express();
var ParserRSS = require('rss-parser');
const parser = new ParserRSS();

const RssDAO = require('./dao.mjs');
const dao = new RssDAO();

app.get('/ShowRssURLs', async function(req, res) {
    dao.getRssURLs().then((rows) => {
        res.send(rows);
    }).catch((error) => {
        res.send(error);
    });
});

app.get('/ShowRSSDocuments', async function(req, res) {
    dao.getRssDocuments().then((rows) => {
        res.send(rows);
    }).catch((error) => {
        res.send(error);
    });
});

app.post('/AddRSS', async function(req, res) {
    let urlRss = req.query['uri'];
    if (urlRss !== undefined) {
        let feed = await parser.parseURL(urlRss);
        if (feed !== undefined) {

            dao.isUrlExist(urlRss).then((isExist) => {
                if (isExist) {
                    res.send('RSS EXISTS');
                } else {
                    let itemsDoc = feed.items.map(item => {
                        return { link : item.link, title: item.title };
                    });
                    dao.addRssUrl(urlRss, feed.title, itemsDoc).then(() => {
                        res.send('OK');
                    }).catch((err) => {
                        res.send('Internal error in DB: ' + err);
                    });
                }        
            }).catch((err) => {
                res.send('Internal error in DB: ' + err);
            });
        } else {
            res.send('INVALID RSS');
        }
    } else {
        res.send('ERROR');
    }
});

app.listen(3000);