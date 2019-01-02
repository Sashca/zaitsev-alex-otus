const sqlite3 = require('sqlite3').verbose();

class RssDAO {
    constructor() { 
        this.db = new sqlite3.Database(':memory:');
        this.db.serialize(() => {
            this.db.run('CREATE TABLE IF NOT EXISTS rss_subscription ( \
                        id INTEGER PRIMARY KEY AUTOINCREMENT,     \
                        urlRss TEXT NOT NULL,                     \
                        title TEXT                                \
                        )');
            this.db.run('CREATE TABLE IF NOT EXISTS rss_documents ( \
                        id INTEGER PRIMARY KEY AUTOINCREMENT,  \
                        link TEXT NOT NULL,                    \
                        title TEXT,                            \
                        rssId INTEGER,                         \
                        CONSTRAINT rss_documents_fk_rss_subscription FOREIGN KEY (rssId) \
                            REFERENCES rss_subscription(id) ON UPDATE CASCADE ON DELETE CASCADE \
                        )');
        });

    }

    getRssURLs () {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT urlRss FROM rss_subscription', (err, rows) => {
                if (err) {
                    reject('ERROR');
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getRssDocuments () {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT link,title FROM rss_documents', (err, rows) => {
                if (err) {
                    reject('ERROR');
                } else {
                    resolve(rows);
                }
            });
        });
    }

    addRssUrl (url, title, docs) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO rss_subscription (urlRss, title) \
            VALUES (?,?)', [url, title]);

            let record = this.db.get('SELECT * FROM rss_subscription WHERE urlRss = ?', [url]);
            docs.forEach(item => {
                this.db.run('INSERT INTO rss_documents(link, title, rssId) \
                        VALUES (?,?,?)', [item.link, item.title, record.id]);
            });
            resolve();
        });
    }

    isUrlExist (url) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM rss_subscription WHERE urlRss = ?', [url], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows !== undefined) resolve(true);
                    else                    resolve(false);
                }
            });
        });
    }
 
};

module.exports = RssDAO;