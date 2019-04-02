const createText = (wordNumber, matches) => {
  const text = [];
  Array.from(Array(wordNumber)).forEach(() => {
    const wordLength = Math.ceil(Math.random() * 10);
    const word = Math.random().toString(36).substring(wordLength + 1);
    text.push(word);
  });
  text.push(...matches);
  return text.join(' ');
};

module.exports = createText;
