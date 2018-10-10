const
    chai = require('chai'),
    server = require('../server'),
    chaiHttp = require('chai-http'),
    should = chai.should();

chai.use(chaiHttp);

describe('/GET events', () => {
    it('should fail for bad token', (done) => {
        chai.request(server)
            .get('/events')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.equal('No token provided.');
                done();
            });
    });

    it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/events')
            .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Mzg1NDE5Mjd9.4ee0vCFg253W4qezdEBFsMfrbAFQV6Iarkgk_nrjiHc')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });

        done();
    });
});