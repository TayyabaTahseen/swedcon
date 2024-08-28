function processFile() {
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('result');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const text = event.target.result;
            const processedText = processText(text);

            resultDiv.textContent = processedText;
        };

        reader.readAsText(file);
    }
}

function processText(text) {
    const wordCounts = countWords(text);
    const mostUsedWord = findMostUsedWord(wordCounts);

    return text.replace(new RegExp(`\\b${mostUsedWord}\\b`, 'g'), `foo{ ${mostUsedWord} } bar`);
}

function countWords(text) {
    const words = text.split(/\s+/);
    const wordCounts = {};

    for (const word of words) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    return wordCounts;
}

function findMostUsedWord(wordCounts) {
    let mostUsedWord = '';
    let maxCount = 0;

    for (const word in wordCounts) {
        if (wordCounts[word] > maxCount) {
            mostUsedWord = word;
            maxCount = wordCounts[word];
        }
    }

    return mostUsedWord;
}