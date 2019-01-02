process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../rss_service');
let should = chai.should();

chai.use(chaiHttp);

describe('RSS testing', () => {

    describe('/POST rss', () => {
        it('it should be return OK', (done) => {
            chai.request(server)
                .post('/rss?uri=https://www.reddit.com/.rss')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql('OK');
                 done();
                });
        });
    });

    describe('/POST rss double', () => {
        it('it should be return RSS EXISTS', (done) => {
            chai.request(server)
            .post('/rss?uri=https://www.reddit.com/.rss')
            .end((err,res) => {
                res.should.have.status(200);
                res.text.should.be.eql('RSS EXISTS');
             done();
            });
        });
    });

    describe('/GET rss urls', () => {
        it('it should be return array, length == 1', (done) => {
            chai.request(server)
            .get('/rss/urls')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
             done();
            });
        });
    });

    describe('/GET rss docs', () => {
        it('it should be return array, length == 23', (done) => {
            chai.request(server)
            .get('/rss/docs')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(25);
             done();
            });
        });
    });

});