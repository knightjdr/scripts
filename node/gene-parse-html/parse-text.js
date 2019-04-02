const parseText = (genes, text) => {
  const re = new RegExp(/[0-9\p{L}-]+/u);
  const replacementText = [];
  let searchText = text;
  while (re.test(searchText)) {
    const match = searchText.match(re);
    const word = match[0];
    const start = match.index;
    const end = start + word.length;
    replacementText.push(searchText.substring(0, start));
    if (genes[word]) {
      const wrap = `<span class="gix-highlight" style="background-color: yellow;">${word}</span>`;
      replacementText.push(wrap);
    } else {
      replacementText.push(word);
    }
    searchText = searchText.substring(end);
  }
  console.log(replacementText.join(''));
};

module.exports = parseText;
