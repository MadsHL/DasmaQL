const assert = require('assert');
const levenshteinDistance = require("../../src/modules/levenshteinDistance");

describe('levenshteinDistance', () => {
    it('should return the correct Levenshtein distance', () => {
        assert.equal(levenshteinDistance('kitten', 'sitting'), 3);
        assert.equal(levenshteinDistance('book', 'back'), 2);
        assert.equal(levenshteinDistance('', 'word'), 4);
        assert.equal(levenshteinDistance('hello', 'hello'), 0);
    });

    it('should handle empty strings correctly', () => {
        assert.equal(levenshteinDistance('', ''), 0);
        assert.equal(levenshteinDistance('abc', ''), 3);
        assert.equal(levenshteinDistance('', 'xyz'), 3);
    });
});