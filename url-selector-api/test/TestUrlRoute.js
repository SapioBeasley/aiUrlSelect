const
    chai = require('chai'),
    server = require('../server'),
    chaiHttp = require('chai-http'),
    should = chai.should();

chai.use(chaiHttp);

describe('/POST url', () => {
    it('should fail for bad token', (done) => {
        chai.request(server)
            .post('/url?companies[]=seamless ai')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.equal('No token provided.');
                done();
            });
    });

    it('should get domain', (done) => {
        chai.request(server)
            .post('/url?companies[]=seamless ai')
            .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Mzg1NTEwMjV9.INSUODoIlL7_kdDwkdgAgqAHu9KgPvyvvI016fDtNpY')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });

        done();
    });
});