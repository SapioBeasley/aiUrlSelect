const
    chai = require('chai'),
    server = require('../server'),
    chaiHttp = require('chai-http'),
    should = chai.should();

chai.use(chaiHttp);

describe('/GET keys', () => {
    it('should fail for bad token', (done) => {
        chai.request(server)
            .get('/list-keys')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.equal('No token provided.');
                done();
            });
    });

    it('it should GET all the keys', (done) => {
        chai.request(server)
            .get('/list-keys')
            .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Mzg1NTEwMjV9.INSUODoIlL7_kdDwkdgAgqAHu9KgPvyvvI016fDtNpY')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});