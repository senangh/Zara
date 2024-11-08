async function fetchWords() {
  const response = await fetch('http://localhost:5000/words');
  const words = await response.json();
  return words.map(word => [word.word, word.count]);
}

async function generateWordCloud() {
  const wordList = await fetchWords();
  const options = {
    list: wordList,
    gridSize: Math.round(16 * document.getElementById('word-cloud').offsetWidth / 1024),
    weightFactor: 10,
    fontFamily: 'Times, serif',
    color: 'random-dark',
    backgroundColor: '#f0f0f0',
  };
  WordCloud(document.getElementById('word-cloud'), options);
}

generateWordCloud();
