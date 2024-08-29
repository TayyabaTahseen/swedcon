
// Handle file input and process the text on form submission
document.getElementById('textForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const fileInput = document.getElementById('inputFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            const processedText = processText(text);
            document.getElementById('outputText').innerHTML = processedText;
        };

        reader.readAsText(file);
    }
    function processText(text) {
        if (!text) return text; // Handle empty text

        // Remove punctuation and split the text into words
        const words = text.match(/\b(\w+)\b/g);

        if (!words) return text; // Handle cases where no words are found

        // Count occurrences of each word
        const wordCount = words.reduce((count, word) => {
            word = word.toLowerCase(); // Make it case-insensitive
            count[word] = (count[word] || 0) + 1;
            return count;
        }, {});

        // Find the most common word
        const mostCommonWord = Object.keys(wordCount).reduce((a, b) =>
            wordCount[a] > wordCount[b] ? a : b
        );

        // Check if the most common word is unique
        const maxCount = wordCount[mostCommonWord];
        const isUnique = Object.values(wordCount).filter(count => count === maxCount).length === 1;

        // If there's no unique most common word, return the text unchanged
        if (maxCount === 1 || !isUnique) {
            return text;
        }

        // Use regex to replace all instances of the most common word with the highlighted version
        const highlightedText = text.replace(
            new RegExp(`\\b${mostCommonWord}\\b`, 'gi'),
            `<span class="highlight">foo(${mostCommonWord})bar</span>`
        );

        return highlightedText;
    }

    module.export = processText(text);




});
