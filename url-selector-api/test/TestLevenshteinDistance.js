const
    expect = require('chai').expect,
    LevenshteinDistance = require('../app/libraries/LevenshteinDistance');

describe('distance()', () => {
    it('Should calculate the edit distance of two strings.', async () => {

        // 1. ARRANGE
        let x = 'sapioweb';
        let y = 'sapioweb.com';
        let expectedDistance = 67; // Should be a 64% match

        // 2. ACT
        let distance = await new LevenshteinDistance(x, y).distance();

        // 3. ASSERT
        expect(distance).to.be.equal(expectedDistance);
    });
});