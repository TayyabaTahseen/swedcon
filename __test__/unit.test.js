const { processText } = require('../script.js');

describe('processText', () => {
    it('should highlight the most used word in a simple sentence', () => {
        const input = "This is a test string. Test the function with test.";
        const expectedOutput = "This is a <span class=\"highlight\">foo(test)bar</span> string. <span class=\"highlight\">foo(test)bar</span> the function with <span class=\"highlight\">foo(test)bar</span>.";
        expect(processText(input)).toEqual(expectedOutput);
    });

    it('should return the original text when there is no unique most common word', () => {
        const input = "This is a simple test.";
        const expectedOutput = "This is a simple test.";
        expect(processText(input)).toEqual(expectedOutput);
    });

    it('should handle empty text gracefully', () => {
        const input = "";
        const expectedOutput = "";
        expect(processText(input)).toEqual(expectedOutput);
    });

    it('should not modify text if all words occur the same number of times', () => {
        const input = "One two three four.";
        const expectedOutput = "One two three four.";
        expect(processText(input)).toEqual(expectedOutput);
    });
});
