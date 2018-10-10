const
    expect = require('chai').expect,
    CompanyToDomain = require('../app/libraries/CompanyToDomain');

describe('get()', () => {
    it('should return the domain results', async () => {

        // 1. ARRANGE
        let company = 'nike';
        let domain = 'nike.com';

        // 2. ACT
        let response = await new CompanyToDomain(company, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Mzg1NTEwMjV9.INSUODoIlL7_kdDwkdgAgqAHu9KgPvyvvI016fDtNpY').get();

        // 3. ASSERT
        expect(response.name).to.be.equal(company);
        expect(response.domain).to.be.equal(domain);
    });
});