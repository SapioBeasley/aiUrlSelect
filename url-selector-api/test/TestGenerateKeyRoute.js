const
    chai = require('chai'),
    server = require('../server'),
    chaiHttp = require('chai-http'),
    should = chai.should();

chai.use(chaiHttp);

describe('/GET generate key', () => {
    it('it should generate a new key and return it', (done) => {
        chai.request(server)
            .get('/generate-key')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});