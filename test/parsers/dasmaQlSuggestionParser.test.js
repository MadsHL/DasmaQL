const assert = require('assert');
const {dasmaQlSuggestionParser} = require("../../src/parsers");
const {dasmaQlSuggestionProcessor} = require("../../src/processors");


describe('Suggestion parsing tests', function () {

    it('parses Logic with AND operator correctly', function () {
        const input = 'field = "value" AND "other field" != "otherValue" O';
        const result = dasmaQlSuggestionParser.parse(input, dasmaQlSuggestionProcessor);
        // Tilpas denne del baseret på den forventede struktur af dit output
        assert.ok(result.length === 4, 'Parser output should have exactly 4 elements');
        assert.deepStrictEqual(result[0],{
            "type": "parameter",
            "field": {
                "type": "field",
                "input": "field",
                "location": {
                    "line": 0,
                    "start": 0,
                    "end": 5
                },
                "suggestions": []
            },
            "input": {
                "value": "value",
                "type": "string",
                "location": {
                    "line": 0,
                    "start": 8,
                    "end": 15
                }
            },
            "suggestions": []
        });
        assert.deepStrictEqual(result[1], {
            "type": "misc",
            "input": "AND",
            "location": {
                "line": 0,
                "start": 16,
                "end": 19
            },
            "suggestions": [
                "AND"
            ]
        });
        assert.deepStrictEqual(result[2], {
            "type": "parameter",
            "field": {
                "type": "field",
                "input": "other field",
                "location": {
                    "line": 0,
                    "start": 20,
                    "end": 33
                },
                "suggestions": []
            },
            "input": {
                "value": "otherValue",
                "type": "string",
                "location": {
                    "line": 0,
                    "start": 37,
                    "end": 49
                }
            },
            "suggestions": []
        })
        assert.deepStrictEqual(result[3], {
            "type": "misc",
            "input": "O",
            "location": {
                "line": 0,
                "start": 50,
                "end": 51
            },
            "suggestions": [
                "OR",
                "ORDER BY"
            ]
        })

    });


    it('handles OrderBy with multiple fields correctly', function () {
        const input = 'field1=value AND field2 NOT BETWEEN (1,2) ORDER BY field1 DESC, field2 ASC';
        const result = dasmaQlSuggestionParser.parse(input, dasmaQlSuggestionProcessor);
        assert.strictEqual(result.length, 9, 'Parser output should match expected number of elements for OrderBy test');
        assert.deepStrictEqual(result[6], {
            "type": "misc",
            "input": "DESC",
            "location": {
                "line": 0,
                "start": 58,
                "end": 62
            },
            "suggestions": [
                "DESC"
            ]
        }, 'Expected an order directive for field1');
        assert.deepStrictEqual(result[8], {
            "type": "misc",
            "input": "ASC",
            "location": {
                "line": 0,
                "start": 71,
                "end": 74
            },
            "suggestions": [
                "ASC"
            ]
        }, 'Expected an order directive for field2');
    });

    it('parses incomplete equality expression', function () {
        const input = 'field1 ';
        const result = dasmaQlSuggestionParser.parse(input, dasmaQlSuggestionProcessor);
        assert.strictEqual(result.length, 1, 'Expected a single suggestion for incomplete expression');

    });

    it('suggests order direction for incomplete ORDER BY clause', function () {
        const input = 'field1=123 ORDER BY field d';
        const result = dasmaQlSuggestionParser.parse(input, dasmaQlSuggestionProcessor);
        assert.strictEqual(result.length, 4, 'Expected suggestions for field, ORDER BY clause, and order direction');
        // Kontroller specifikt for forslag om sortering
        assert.deepStrictEqual(result[3], {
            "type": "misc",
            "input": "d",
            "location": {
                "line": 0,
                "start": 26,
                "end": 27
            },
            "suggestions": [
                "DESC"
            ]
        }, 'Expected ASC suggestion for incomplete order direction');
    });

    it('parses complex logic with multiple conditions', function () {
        const input = 'field1 = "value1" OR field2 != 2024-12-24 AND (field3 in ("value3.1", "value3.2") OR field4 = value4() AND field5 between (1,9)) ORDER BY field1, field2 asc, field3 desc -- This is a comment';
        const result = dasmaQlSuggestionParser.parse(input, dasmaQlSuggestionProcessor);
        assert.strictEqual(result.length, 18);
        assert.deepStrictEqual(result.map(t=>t.type),["parameter","misc","parameter","misc","parameter","parameter","misc","parameter","misc","parameter","parameter","misc","field","field","misc","field","misc","comment"])
        assert.deepStrictEqual(result.filter(i => i.type === "parameter").map(i => i.input.type), ["string","date","string","string","function","number","number"]);
    });

    it('gracefully handles unrecognized input', function () {
        const input = 'unrecognized input here';
        const result = dasmaQlSuggestionParser.parse(input, dasmaQlSuggestionProcessor);
        assert.doesNotThrow(() => dasmaQlSuggestionParser.parse(input, dasmaQlSuggestionProcessor), 'Parser should not throw an error on unrecognized input');
    });


});
