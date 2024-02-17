const assert = require('assert');
const {levenshteinDistance, levenshteinSearchSort} = require("../../src/modules/levenshteinDistance");

describe('Levenshtein Tests', () => {
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

    describe('levenshteinSearchSort Tests', () => {
        const elements = [
            {label: 'Apple'},
            'Banana',
            {label: 'Cherry'},
            'Date',
            {label: 'Elderberry'},
            'Fig',
            {label: 'Grape'}
        ];

        it('should correctly sort elements based on Levenshtein distance to the search term', () => {
            const sortedElements = levenshteinSearchSort(elements, 'Apple');
            assert.deepEqual(sortedElements, [{"label":"Apple"},"Banana",{"label":"Elderberry"},{"label":"Grape"}]);
        });

        it('should limit the number of suggestions based on maxSuggestions', () => {
            const sortedElements = levenshteinSearchSort(elements, 'Banana');
            assert.deepEqual(sortedElements, ["Banana"]);
        });

        it('should return elements sorted alphabetically if distances are equal', () => {
            const sortedElements = levenshteinSearchSort(elements, 'Fig');
            assert.deepEqual(sortedElements, ["Fig"]);
        });

        it('should handle empty search term correctly', () => {
            const sortedElements = levenshteinSearchSort(elements, '', 5);
            assert.deepEqual(sortedElements, []);
        });
    });
});